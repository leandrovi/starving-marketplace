export interface User {
  _id: string;
  walletAddress: string;
  role: "admin" | "none";
  createdAt: Date;
  updatedAt: Date;
}

export interface NFT {
  _id: string;
  identification: number;
  name: string;
  description?: string;
  fileCID: string;
  fileName: string;
  price: number;
  isDonation: boolean;
  isListedForSale?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NFTTransaction {
  _id: string;
  nftId: string;
  authorAddress: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
