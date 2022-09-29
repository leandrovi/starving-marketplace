import Marketplace from 0x72e46439286bcfe4

pub fun main(address: Address): {UInt64: UFix64?} {
    let account = getAccount(address)

    let idsAndPrices: {UInt64: UFix64?} = {}

    let saleRef = account.getCapability(/public/NFTSale)
                       .borrow<&AnyResource{Marketplace.SalePublic}>()
                       ?? panic("Could not borrow account nft sale reference")

    for nftId in saleRef.getIDs() {
      idsAndPrices.insert(key: nftId, saleRef.idPrice(tokenID: nftId))
    }
    
    return idsAndPrices

}
