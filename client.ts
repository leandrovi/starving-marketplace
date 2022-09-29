import Nullstack, { NullstackClientContext } from "nullstack";
import { Web3Storage } from "web3.storage";
import * as fcl from "@onflow/fcl";

import Application from "./src/Application";
import { fclConfig } from "./src/configs/fcl";
import { FlowUser } from "./src/appTypes/flow";

export type AppClientContext<TProps = unknown> =
  NullstackClientContext<TProps> & {
    isAuthenticated: boolean;
    adminUser: FlowUser;
    authz: any;
  };

const context = Nullstack.start(Application) as AppClientContext;

context.start = async function start() {
  fcl.config(fclConfig);
};

export default context;
