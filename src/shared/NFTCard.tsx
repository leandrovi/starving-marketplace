import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";

import { AppClientContext } from "../../client";
import { NFT } from "../appTypes/types";
import { getNFTPictureSrc } from "../utils/getNFTPictureSrc";

const LIST_NFT_FOR_SALE: string = require("../../cadence/transactions/ListNFTForSale.cdc");

interface NFTCardProps {
  nft: NFT;
  isAdminView?: boolean;
  showEdition?: boolean;
}

class NFTCard extends Nullstack {
  isListedForSale = false;
  isLoading = false;

  async listNFTForSale({ nft }: AppClientContext<NFTCardProps>) {
    this.isLoading = true;

    console.log("opa");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const transactionId = await fcl.mutate({
        cadence: LIST_NFT_FOR_SALE,
        args: (arg, t) => [
          arg(nft.identification, t.UInt64),
          arg(nft.price, t.UFix64),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorization: [fcl.currentUser],
        limit: 100,
      });

      await fcl.tx(transactionId).onceSealed();
      this.isListedForSale = true;
    } catch (err) {
      console.log({ err });
    } finally {
      this.isLoading = false;
    }
  }

  render({ nft, isAdminView, showEdition }: AppClientContext<NFTCardProps>) {
    return (
      <div class="border-[3px] w-fit p-2.5">
        <img
          class="w-[285px] aspect-square object-cover"
          src={getNFTPictureSrc(nft.fileCID, nft.fileName)}
          alt={nft.fileName}
        />
        <strong class="text-[17px] leading-[24px] mt-[11px] block">
          {nft.name}
        </strong>
        <p class="font-light text-[12.7px] leading-[17.79px]">Creator's name</p>
        <div class="flex flex-row items-end justify-between">
          {isAdminView ? (
            <>
              <p class="text-yellow text-thin text-sm font-light">
                1 Edition Minted
              </p>
              {nft.isDonation ? (
                <p class="font-light text-pink text-sm mt-[11px]">Donation</p>
              ) : (
                <div class="flex flex-col items-end">
                  <p class="text-white font-light leading-[16px]">Price</p>
                  {nft.isListedForSale || this.isListedForSale ? (
                    <div class="flex flex-row align-center">
                      <img src="/icons/drop.svg" class="mr-1" />
                      {nft.price}
                    </div>
                  ) : (
                    <span class="font-light text-sm text-pink">
                      {this.isLoading ? (
                        "loading..."
                      ) : (
                        <>
                          not for sale{" "}
                          <button
                            class="text-white"
                            onclick={this.listNFTForSale}
                          >
                            (click to list)
                          </button>
                        </>
                      )}
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {showEdition && (
                <p class="text-yellow text-thin text-sm">1 Edition Minted</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default NFTCard;
