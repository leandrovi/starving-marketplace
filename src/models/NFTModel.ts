import { Schema, model } from "mongoose";

import { NFT } from "../appTypes/types";

const nftSchema = new Schema<NFT>(
  {
    identification: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    fileCID: { type: String, required: false },
    price: { type: Number, required: true },
    isDonation: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const NFTModel = model<NFT>("nfts", nftSchema);
