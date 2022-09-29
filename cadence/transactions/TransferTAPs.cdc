import TAPToken from 0x72e46439286bcfe4

transaction(destinationAddress: Address, amount: UFix64) {

  // Temporary Vault object that holds the balance that is being transferred
  var temporaryVault: @TAPToken.Vault

  prepare(acct: AuthAccount) {
    // withdraw tokens from your vault by borrowing a reference to it
    // and calling the withdraw function with that reference
    let vaultRef = acct.borrow<&TAPToken.Vault>(from: /storage/TAPVaul)
        ?? panic("Could not borrow a reference to the owner's vault")
      
    self.temporaryVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    // get the recipient's public account object
    let recipient = getAccount(destinationAddress)

    // get the recipient's Receiver reference to their Vault
    // by borrowing the reference from the public capability
    let receiverRef = recipient.getCapability(/public/TAPVaultReceiver)
                      .borrow<&TAPToken.Vault{TAPToken.Receiver}>()
                      ?? panic("Could not borrow a reference to the receiver")

    // deposit your tokens to their Vault
    receiverRef.deposit(from: <-self.temporaryVault)

    log("Transfer succeeded!")
  }
}