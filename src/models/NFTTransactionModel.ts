import { Schema, model } from "mongoose";

import { NFTTransaction } from "../appTypes/types";

const nftTransactionSchema = new Schema<NFTTransaction>(
  {
    nftId: { type: String, required: true },
    authorAddress: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const NFTTransactionModel = model<NFTTransaction>(
  "nft_transactions",
  nftTransactionSchema
);
