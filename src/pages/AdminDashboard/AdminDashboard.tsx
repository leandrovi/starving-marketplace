import Nullstack from "nullstack";

import Faucet from "./components/Faucet";

class AdminDashboard extends Nullstack {
  render() {
    return (
      <section class="px-[9.75rem] py-[7.891rem]">
        <Faucet />
      </section>
    );
  }
}

export default AdminDashboard;
