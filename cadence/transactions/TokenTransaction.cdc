transaction(rcptAddress: Address) {

  execute {
    let recipient = getAccount(rcptAddress)

    log("Transfer succeeded!")
  }
}