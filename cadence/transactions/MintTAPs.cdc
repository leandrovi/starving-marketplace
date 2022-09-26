import TAPToken from 0x72e46439286bcfe4

transaction(destinationAddress: Address, amount: UFix64) {

    // Local variable for storing the reference to the minter resource
    let mintingRef: &TAPToken.VaultMinter

    // Local variable for storing the reference to the Vault of
    // the account that will receive the newly minted tokens
    var receiver: Capability<&TAPToken.Vault{TAPToken.Receiver}>

	prepare(acct: AuthAccount) {
        // Borrow a reference to the stored, private minter resource
        self.mintingRef = acct.borrow<&TAPToken.VaultMinter>(from: /storage/TAPMinter)
            ?? panic("Could not borrow a reference to the minter")
        
        // Get the public account object for account from destinationAddress
        let recipient = getAccount(destinationAddress)

        // Get their public receiver capability
        self.receiver = recipient.getCapability<&TAPToken.Vault{TAPToken.Receiver}>(/public/TAPVaultReceiver)

	}

    execute {
        // Mint the amount of tokens and deposit them into the recipient's Vault
        self.mintingRef.mintTokens(amount: amount, recipient: self.receiver)
        log("Tokens minted and deposited to account")
    }
}



