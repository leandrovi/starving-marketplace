import TAPToken from 0x72e46439286bcfe4
import StarvingNFT from 0x72e46439286bcfe4
import Marketplace from 0x72e46439286bcfe4

// This transaction creates a new Sale Collection object,
// lists an NFT for sale, puts it in account storage,
// and creates a public capability to the sale so that others can buy the token.
transaction(nftID: UInt64, price: UFix64) {

    prepare(acct: AuthAccount) {
      if let sale <- acct.load<@Marketplace.SaleCollection?>(from: /storage/NFTSale) {
        sale?.listForSale(tokenID: nftID, price: price)
        acct.save(<-sale!, to: /storage/NFTSale)
      } else {
        // Borrow a reference to the stored Vault
        let receiver = acct.getCapability<&{TAPToken.Receiver}>(/public/TAPVaultReceiver)

        // borrow a reference to the StarvingNFTCollection in storage
        let collectionCapability = acct.link<&StarvingNFT.Collection>(/private/StarvingNFTCollection, target: StarvingNFT.CollectionStoragePath)
          ?? panic("Unable to create private link to NFT Collection")

        // Create a new Sale object,
        // initializing it with the reference to the owner's vault
        let sale <- Marketplace.createSaleCollection(ownerCollection: collectionCapability, ownerVault: receiver)

        // List the token for sale by moving it into the sale object
        sale.listForSale(tokenID: nftID, price: price)

        // Store the sale object in the account storage
        acct.save(<-sale, to: /storage/NFTSale)

        // Create a public capability to the sale so that others can call its methods
        acct.link<&Marketplace.SaleCollection{Marketplace.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)
      }      
    }
}

