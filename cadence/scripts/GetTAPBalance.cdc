import TAPToken from 0x72e46439286bcfe4

// This script reads the Vault balances of two accounts.
pub fun main(account: Address): UFix64 {
    // Get the accounts' public account objects
    let acc = getAccount(account)

    // Get references to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let accReceiverRef = acc.getCapability(/public/TAPVaultReceiver)
                            .borrow<&TAPToken.Vault{TAPToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acc receiver")

    return accReceiverRef.balance
}
 