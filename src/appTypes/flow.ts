export interface Key {
  hashAlgo: number;
  hashAlgoString: string;
  index: number;
  publicKey: string;
  revoked: boolean;
  sequenceNumber: number;
  signAlgo: number;
  signAlgoString: string;
  weight: number;
}

export interface Account {
  address: string;
  balance: number;
  code: string;
  contracts: any;
  keys: Key[];
}
