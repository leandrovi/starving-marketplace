import TAPToken from 0x72e46439286bcfe4
import StarvingNFT from 0x72e46439286bcfe4

// This script checks that the accounts are set up correctly

pub fun main(accountAddress: Address) {
    // Get the account's public account objects
    let acct = getAccount(accountAddress)

    // Get references to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let receiverRef = acct.getCapability(/public/TAPVaultReceiver)
                          .borrow<&TAPToken.Vault{TAPToken.Balance}>()
                          ?? panic("Could not borrow acct vault reference")


    // Log the Vault balance of both accounts
    log("Account Balance")
    log(receiverRef.balance)

    // Find the public Receiver capability for the Collections
    let acctCapability = acct.getCapability(StarvingNFT.CollectionPublicPath)

    // borrow references from the capabilities
    let nftRef = acctCapability.borrow<&{StarvingNFT.StarvingChildrenNFTCollectionPublic}>()
        ?? panic("Could not borrow acct nft collection reference")

    // Print both collections as arrays of IDs
    log("Account NFTs")
    log(nftRef.getIDs())

    // verify that the collections are correct
    if nftRef.getIDs().length != 0 {
        panic("Wrong Collections!")
    }
}
