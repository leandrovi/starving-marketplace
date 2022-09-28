import NonFungibleToken from 0x72e46439286bcfe4
import Metadata from 0x72e46439286bcfe4

pub contract StarvingNFT: NonFungibleToken {

    pub var totalSupply: UInt64

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Minted(id: UInt64, name: String, description: String, fileCID: String)

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    pub resource NFT: NonFungibleToken.INFT, Metadata.Resolver {
        pub let id: UInt64
        pub let name: String
        pub let description: String
        pub let fileCID: String
    
        init(
            id: UInt64,
            name: String,
            description: String,
            fileCID: String
        ) {
            self.id = id
            self.name = name
            self.description = description
            self.fileCID = fileCID
        }
    
        pub fun getViews(): [Type] {
            return [
                Type<Metadata.Display>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<Metadata.Display>():
                    return Metadata.Display(
                        name: self.name,
                        description: self.description,
                        thumbnail: Metadata.IPFSFile(
                            cid: self.fileCID, 
                            path: nil
                        )
                    )
            }
            return nil
        }
    }

    pub resource interface StarvingChildrenNFTCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowStarvingChildrenNFT(id: UInt64): &StarvingNFT.NFT? {
            post {
                (result == nil) || (result?.id == id):
                    "Cannot borrow StarvingNFT reference: the ID of the returned reference is incorrect"
            }
        }
    }

    pub resource Collection: StarvingChildrenNFTCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, Metadata.ResolverCollection {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        // withdraw removes an NFT from the collection and moves it to the caller
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @StarvingNFT.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // borrowNFT gets a reference to an NFT in the collection
        // so that the caller can read its metadata and call its methods
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }
 
        pub fun borrowStarvingChildrenNFT(id: UInt64): &StarvingNFT.NFT? {
            if self.ownedNFTs[id] != nil {
                // Create an authorized reference to allow downcasting
                let ref = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
                return ref as! &StarvingNFT.NFT
            }

            return nil
        }

        pub fun borrowViewResolver(id: UInt64): &AnyResource{Metadata.Resolver} {
            let nft = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            let starvingChildrenNFT = nft as! &StarvingNFT.NFT
            return starvingChildrenNFT as &AnyResource{Metadata.Resolver}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // public function that anyone can call to create a new empty collection
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    // Resource that an admin or something similar would own to be
    // able to mint new NFTs
    //
    pub resource NFTMinter {

        // mintNFT mints a new NFT with a new ID
        // and deposit it in the recipients collection using their collection reference
        pub fun mintNFT(
            recipient: &{NonFungibleToken.CollectionPublic},
            name: String,
            description: String,
            fileCID: String,
        ) {
            // create a new NFT
            var newNFT <- create NFT(
                id: StarvingNFT.totalSupply,
                name: name,
                description: description,
                fileCID: fileCID
            )

            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            StarvingNFT.totalSupply = StarvingNFT.totalSupply + UInt64(1)

            emit Minted(
                id: StarvingNFT.totalSupply,
                name: name,
                description: description,
                fileCID: fileCID
            )
        }
    }

    init() {
        // Initialize the total supply
        self.totalSupply = 0

        // Set the named paths
        self.CollectionStoragePath = /storage/StarvingNFTCollection
        self.CollectionPublicPath = /public/StarvingNFTCollection
        self.MinterStoragePath = /storage/StarvingNFTMinter

        // Create a Collection resource and save it to storage
        let collection <- create Collection()
        self.account.save(<-collection, to: self.CollectionStoragePath)

        // create a public capability for the collection
        self.account.link<&StarvingNFT.Collection{NonFungibleToken.CollectionPublic, StarvingNFT.StarvingChildrenNFTCollectionPublic, Metadata.ResolverCollection}>(
            self.CollectionPublicPath,
            target: self.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        let minter <- create NFTMinter()
        self.account.save(<-minter, to: self.MinterStoragePath)

        emit ContractInitialized()
    }
}