import TAPToken from 0x56f7fb68a7a63940

// This script reads the Vault balances of two accounts.
pub fun main(account: String) {
    // Get the accounts' public account objects
    let acc = getAccount(account)

    // Get references to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let accReceiverRef = acct2.getCapability(/public/TAPReceiver)
                            .borrow<&ExampleToken.Vault{ExampleToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acc receiver")

    // Read and log balance fields
    log("Account Balance")
	  log(accReceiverRef.balance)
}
