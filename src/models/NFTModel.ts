import { Schema, model } from "mongoose";

import { NFT } from "../appTypes/types";

const nftSchema = new Schema<NFT>(
  {
    identification: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    fileCID: { type: String, required: false },
    fileName: { type: String, required: true },
    price: { type: Number, required: true },
    isDonation: { type: Boolean, required: true },
    isListedForSale: { type: Boolean, required: false },
  },
  { timestamps: true }
);

export const NFTModel = model<NFT>("nfts", nftSchema);
