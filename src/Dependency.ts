import Nullstack, { NullstackServerContext } from "nullstack";
import mongoose from "mongoose";
import { Web3Storage } from "web3.storage";

import { Account } from "./appTypes/flow";

export interface ServerContext extends NullstackServerContext {
  database: typeof mongoose;
  adminAccount?: Account;
  web3StorageClient: Web3Storage;
}

class Dependency extends Nullstack {
  static async _start(context: ServerContext) {
    const { secrets } = context;
    const mongoConn = await mongoose.connect(secrets.mongoUrl as string);
    const web3StorageClient = new Web3Storage({
      token: secrets.web3StorageClient as string,
    });

    context.database = mongoConn;
    context.web3StorageClient = web3StorageClient;
  }
}

export default Dependency;
