import Nullstack, { NullstackClientContext } from "nullstack";
import * as fcl from "@onflow/fcl";

import Application from "./src/Application";
import { fclConfig } from "./src/configs/fcl";
import { Account } from "./src/appTypes/flow";

export type AppClientContext<TProps = unknown> =
  NullstackClientContext<TProps> & {
    isAuthenticated: boolean;
    adminAccount: Account;
  };

const context = Nullstack.start(Application) as AppClientContext;

context.start = async function start() {
  fcl.config(fclConfig);
};

export default context;
