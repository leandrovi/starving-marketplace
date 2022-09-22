import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";

import Faucet from "./components/Faucet";
import { AppClientContext } from "../../../client";

class AdminDashboard extends Nullstack {
  walletAddress: string;

  async hydrate(context: AppClientContext) {
    const wallet = localStorage.getItem("walletAddress");
    this.walletAddress = wallet;

    if (wallet) {
      const account = await fcl
        .send([fcl.getAccount(this.walletAddress)])
        .then(fcl.decode);

      context.adminAccount = account;
    }
  }

  render() {
    return (
      <section class="px-[9.75rem] py-[7.891rem]">
        {this.walletAddress && <p>Wallet: {this.walletAddress}</p>}
        <Faucet bind={this.walletAddress} />
      </section>
    );
  }
}

export default AdminDashboard;
