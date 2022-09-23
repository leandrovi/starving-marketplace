import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";

import Faucet from "./components/Faucet";
import { AppClientContext } from "../../../client";

class AdminDashboard extends Nullstack {
  render({ adminAccount }: AppClientContext) {
    return (
      <section class="px-[9.75rem] py-[7.891rem]">
        <p>Wallet: 0x{adminAccount.address}</p>
        <Faucet />
      </section>
    );
  }
}

export default AdminDashboard;
