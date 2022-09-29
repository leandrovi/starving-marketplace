import TAPToken from 0x72e46439286bcfe4
import NonFungibleToken from 0x72e46439286bcfe4
import StarvingNFT from 0x72e46439286bcfe4

transaction(recipient: Address, name: String, description: String, fileCID: String) {
    let minter: &StarvingNFT.NFTMinter
    let signerAccount: AuthAccount

    prepare(signer: AuthAccount) {
        self.signerAccount = signer
        self.minter = signer.borrow<&StarvingNFT.NFTMinter>(from: StarvingNFT.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        let recipient = getAccount(recipient)

        let receiver = recipient
            .getCapability(StarvingNFT.CollectionPublicPath)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        self.minter.mintNFT(
            recipient: receiver,
            name: name,
            description: description,
            fileCID: fileCID
        )
    }
}
