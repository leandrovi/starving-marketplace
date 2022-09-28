import StarvingNFT from 0x72e46439286bcfe4
import NonFungibleToken from 0x72e46439286bcfe4
import Metadata from 0x72e46439286bcfe4
import Marketplace from 0x72e46439286bcfe4

pub struct NFT {
  pub let id: UInt64
  pub let name: String
  pub let description: String
  pub let thumbnailUrl: String
  pub let owner: Address
  pub let price: UFix64?

  init(
    id: UInt64,
    name: String,
    description: String,
    thumbnailUrl: String,
    owner: Address,
    price: UFix64?,
  ) {
    self.id = id
    self.name = name
    self.description = description
    self.thumbnailUrl = thumbnailUrl
    self.owner = owner
    self.price = price
  }
}

pub fun getThumbnailURL(_ file: Metadata.IPFSFile): String {
  var url = "https://".concat(file.cid).concat(".ipfs.dweb.link/")

  if let path = file.path {
      return url.concat(path)
  }

  return url
}

pub fun main(address: Address): [NFT] {
  let account = getAccount(address)
  let publicCollectionCapabilityRef = account.getCapability<&StarvingNFT.Collection{NonFungibleToken.CollectionPublic, StarvingNFT.StarvingChildrenNFTCollectionPublic, Metadata.ResolverCollection}>(StarvingNFT.CollectionPublicPath).borrow()
      ?? panic("Could not borrow account nft ccollection reference")

  let nftsIds = publicCollectionCapabilityRef.getIDs()
  let nftsList: [NFT] = []

  for id in nftsIds {
      if let nft = publicCollectionCapabilityRef.borrowStarvingChildrenNFT(id: id) {
          if let nftView = nft.resolveView(Type<Metadata.Display>()) {
              let display = nftView as! Metadata.Display
              let thumbnail = display.thumbnail as! Metadata.IPFSFile
              var price: UFix64? = nil

              if let saleRef = account.getCapability(/public/NFTSale)
                  .borrow<&AnyResource{Marketplace.SalePublic}>() {
                  price = saleRef.idPrice(tokenID: id)
              }

              nftsList.append(NFT(
                id: id,
                name: display.name,
                description: display.description,
                thumbnailUrl: getThumbnailURL(thumbnail),
                owner: address,
                price: price,
              ))
          }
      }
    
  }

  // Return list of NFTs
  return nftsList
}