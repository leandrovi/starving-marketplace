import TAPToken from 0x72e46439286bcfe4
import StarvingNFT from 0x72e46439286bcfe4
import NonFungibleToken from 0x72e46439286bcfe4
import Metadata from 0x72e46439286bcfe4

/*
  This transaction sets everything that a new account needs
  - It creates the Vault to manage the TAP tokens
  - It creates a collection for the Starving Children NFTs 
*/

// Prepare an account (that is not admin) to hold NFTs
// by publishing a Vault reference and creating an empty NFT Collection.
transaction {
  prepare(acct: AuthAccount) {
    // Create a public Receiver capability to the Vault
    acct.link<&TAPToken.Vault{TAPToken.Receiver, TAPToken.Balance}>
             (/public/TAPVaultReceiver, target: /storage/TAPVault)

    log("Created Vault references")

    // store an empty NFT Collection in account storage
    acct.save<@StarvingNFT.Collection>(<-StarvingNFT.createEmptyCollection(), to: StarvingNFT.CollectionStoragePath)

    // publish a capability to the Collection in storage
    acct.link<&StarvingNFT.Collection{NonFungibleToken.CollectionPublic, StarvingNFT.StarvingChildrenNFTCollectionPublic, Metadata.ResolverCollection}>(StarvingNFT.CollectionPublicPath, target: StarvingNFT.CollectionStoragePath)

    log("Created a new empty collection and published a reference")
  }
}
