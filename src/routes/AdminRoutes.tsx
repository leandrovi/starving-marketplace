import Nullstack, { NullstackClientContext, NullstackNode } from "nullstack";
import * as fcl from "@onflow/fcl";

import { AppClientContext } from "../../client";
import Logo from "../shared/components/Logo";
import { maskWalletAddress } from "../utils/maskWalletAddress";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminAuth from "../pages/AdminAuth/AdminAuth";
import AdminCreateNFT from "../pages/AdminCreateNFT/AdminCreateNFT";

declare function Menu(): NullstackNode;
declare function MenuItem(): NullstackNode;
declare function ActiveMenuItem(): NullstackNode;
declare function UserInfo(): NullstackNode;
declare function Routes(): NullstackNode;

const menuItems = [
  { path: "/admin", title: "Dashboard", icon: "/icons/nfts.svg" },
  { path: "/admin/nfts", title: "NFTs", icon: "/icons/nfts.svg" },
  { path: "/admin/traits", title: "Traits", icon: "/icons/traits.svg" },
];

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

  renderMenuItem({ children }: AppClientContext) {
    return <div class="px-9 py-4 flex flex-row align-center">{children}</div>;
  }

  renderActiveMenuItem({ children }: AppClientContext) {
    return (
      <div class="px-9 py-4 flex flex-row align-center border-y border-gradient-r-yellow bg-gradient-to-r from-alphas-yellow to-alphas-black">
        {children}
      </div>
    );
  }

  renderMenu({ router }: AppClientContext) {
    return (
      <div class="w-[224px] h-screen py-10 flex flex-col items-center justify-start">
        <Logo />

        <div class="mt-8">
          <a class="bg-yellow py-0 px-4 text-black" href="/admin/nfts/create">
            Create NFT
          </a>
        </div>

        <nav class="mt-8 w-full">
          {menuItems.map((menuItem) => (
            <a
              key={menuItem.path}
              href={menuItem.path}
              class="cursor-pointer hover:brightness-75 ease-linear duration-200"
            >
              {router.path === menuItem.path ? (
                <ActiveMenuItem>
                  <img class="mr-4" src={menuItem.icon} />
                  <p class="font-thin text-sm">{menuItem.title}</p>
                </ActiveMenuItem>
              ) : (
                <MenuItem>
                  <img class="mr-4" src={menuItem.icon} />
                  <p class="font-thin text-sm">{menuItem.title}</p>
                </MenuItem>
              )}
            </a>
          ))}
        </nav>
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
        <AdminCreateNFT route="/admin/nfts/create" />
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
