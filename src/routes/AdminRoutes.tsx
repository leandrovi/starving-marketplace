import Nullstack, { NullstackClientContext, NullstackNode } from "nullstack";

import { AppClientContext } from "../../client";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminAuth from "../pages/AdminAuth/AdminAuth";
import Logo from "../shared/components/Logo";

declare function Menu(): NullstackNode;
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

  renderMenu() {
    return (
      <div class="w-[224px] h-screen px-9 py-10">
        <Logo />
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
        <main class="bg-darkGray h-screen flex-1">
          <Routes />
        </main>
      </div>
    );
  }
}

export default AdminRoutes;
