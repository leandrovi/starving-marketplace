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

export interface FlowUser {
  f_type: string;
  f_vsn: string;
  addr?: string;
  cid?: string;
  loggedIn?: boolean;
  expiresAt?: Date;
  services: any[];
}
