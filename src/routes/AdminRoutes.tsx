import Nullstack, { NullstackClientContext, NullstackNode } from "nullstack";
import * as fcl from "@onflow/fcl";

import { AppClientContext } from "../../client";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminAuth from "../pages/AdminAuth/AdminAuth";
import Logo from "../shared/components/Logo";
import { maskWalletAddress } from "../utils/maskWalletAddress";

declare function Menu(): NullstackNode;
declare function UserInfo(): NullstackNode;
declare function Routes(): NullstackNode;

class AdminRoutes extends Nullstack {
  prepare({ project, page }: NullstackClientContext) {
    page.title = `${project.name} - Dashboard`;
    page.description = `${project.name} is focused on embarrassing "non-profitable" institutions that only seeks (wait for it) profit.`;
  }

  async initiate({ isAuthenticated, router }: AppClientContext) {
    if (!isAuthenticated) {
      router.path = "/admin/auth";
    }
  }

  logout(context: AppClientContext) {
    fcl.unauthenticate();
    context.isAuthenticated = false;
    context.router.path = "/admin/auth";
  }

  renderMenu() {
    return (
      <div class="w-[224px] h-screen px-9 py-10">
        <Logo />
      </div>
    );
  }

  renderUserInfo({ adminUser }: AppClientContext) {
    return (
      <div class="absolute right-[68px] top-[65px] flex flex-row align-center">
        <div class="flex flex-row align-center">
          <img src="/icons/wallet.svg" alt="Wallet" />
          <p class="ml-1 mr-4 font-thin">{maskWalletAddress(adminUser.addr)}</p>
        </div>
        <button
          onclick={this.logout}
          class="font-thin flex flex-row align-center"
        >
          <img src="/icons/logout.svg" alt="logout" />
          <p class="font-thin ml-1">logout</p>
        </button>
      </div>
    );
  }

  renderRoutes() {
    return (
      <>
        <AdminDashboard route="/admin" />
        <AdminAuth route="/admin/auth" />
        {/* TODO: add other routes here */}
      </>
    );
  }

  render({ isAuthenticated }: AppClientContext) {
    if (!this.initiated) return false;

    return (
      <div class="flex flex-row">
        {isAuthenticated && <Menu />}
        {isAuthenticated && <UserInfo />}
        <main class="bg-darkGray h-screen flex-1">
          <Routes />
        </main>
      </div>
    );
  }
}

export default AdminRoutes;
