import TAPToken from 0x56f7fb68a7a63940

// This transaction configures an account to store and receive tokens defined by
// the TAPToken contract.
transaction(account: Address) {
	prepare(acct: AuthAccount) {
		// Create a new empty Vault object
		let vault <- TAPToken.createEmptyVault()
			
		// Store the vault in the account storage
		acct.save<@TAPToken.Vault>(<-vault, to: /storage/TAPVault)

    // Create a public Receiver capability to the Vault
		let ReceiverRef = acct.link<&TAPToken.Vault{TAPToken.Receiver, TAPToken.Balance}>(/public/TAPReceiver, target: /storage/TAPVault)
	}

    post {
        // Check that the capabilities were created correctly
        getAccount(account).getCapability<&TAPToken.Vault{TAPToken.Receiver}>(/public/TAPReceiver)
                        .check():  
                        "Vault Receiver Reference was not created correctly"
    }
}
 