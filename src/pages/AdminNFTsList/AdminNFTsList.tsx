import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";

import { NFT } from "../../appTypes/types";
import { NFTModel } from "../../models/NFTModel";
import NFTCard from "../../shared/NFTCard";
import { AppClientContext } from "../../../client";

const LIST_NFTS_FOR_SALE: string = require("../../../cadence/scripts/ListNFTsIdsForSale.cdc");

class AdminNFTsList extends Nullstack {
  nfts: NFT[] = [];

  static async getNFTs() {
    return await NFTModel.find();
  }

  async initiate({ adminUser }: AppClientContext) {
    // @ts-ignore
    const nfts: NFT[] = await this.getNFTs();

    const result = await fcl.query({
      cadence: LIST_NFTS_FOR_SALE,
      args: (arg, t) => [arg(adminUser.addr, t.Address)],
    });

    const nftsWithListings = nfts.map((nft) => {
      if (Object.keys(result).includes(String(nft.identification))) {
        return {
          ...nft,
          price: Number(result[nft.identification]),
          isListedForSale: true,
        };
      }

      return nft;
    });

    this.nfts = nftsWithListings;
  }

  render() {
    return (
      <section class="px-[62px] py-[67px]">
        <h1 class="text-[18.76px] leading-[26.28px]">NFTs</h1>
        <p class="font-thin text-[18px] leading-[25.22px] mb-[29px]">
          Manage all your NFTs
        </p>
        {!this.initiated ? (
          <p>Loading...</p>
        ) : (
          <div class="flex flex-row flex-wrap gap-7">
            {this.nfts.map((nft) => (
              <NFTCard nft={nft} isAdminView={true} />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default AdminNFTsList;
