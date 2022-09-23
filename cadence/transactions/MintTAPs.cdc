import TAPToken from 0x56f7fb68a7a63940

// This transaction mints tokens and deposits them into auth account's Vault
transaction (amount: UFix64): UFix64 {

  // Local variable for storing the reference to the minter resource
  let mintingRef: &TAPToken.VaultMinter
  let receiverRef: $TAPToken.TAPReceiver

  // Local variable for storing the reference to the Vault of
  // the account that will receive the newly minted tokens
  var receiver: Capability<&TAPToken.Vault{TAPToken.Receiver}>

	prepare(acct: AuthAccount): UFix64 {
        // Borrow a reference to the stored, private minter resource
        self.mintingRef = acct.borrow<&TAPToken.VaultMinter>(from: /storage/TAPMinter)
            ?? panic("Could not borrow a reference to the minter")
        
        // Get the public account object for account recipientAddress
        let recipient = getAccount(acct)

        // Get their public receiver capability
        self.receiver = recipient.getCapability<&TAPToken.Vault{TAPToken.Receiver}>(/public/TAPReceiver)

        // Prepare to retrieve balance
        self.receiverRef = acc.getCapability(/public/TAPReceiver)
                            .borrow<&TAPToken.Vault{TAPToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acc receiver")
	}

    execute {
        // Mint the amount of tokens and deposit them into the recipient's Vault
        self.mintingRef.mintTokens(amount: amount, recipient: self.receiver)
        return receiverRef.balance
    }
}
 
