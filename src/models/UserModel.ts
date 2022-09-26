import mongoose, { Schema, model } from "mongoose";

import { User } from "../appTypes/types";

const userSchema = new Schema<User>(
  {
    walletAddress: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = model<User>("users", userSchema);
