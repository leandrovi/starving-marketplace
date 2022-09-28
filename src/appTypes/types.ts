export interface User {
  _id: string;
  walletAddress: string;
  role: "admin" | "none";
  createdAt: Date;
  updatedAt: Date;
}
