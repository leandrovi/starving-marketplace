import Nullstack, { NullstackClientContext, NullstackNode } from "nullstack";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

declare function Menu(): NullstackNode;
declare function Logo(): NullstackNode;
declare function Routes(): NullstackNode;

class AdminRoutes extends Nullstack {
  prepare({ project, page }: NullstackClientContext) {
    page.title = `${project.name} - Dashboard`;
    page.description = `${project.name} is focused on embarrassing "non-profitable" institutions that only seeks (wait for it) profit.`;
  }

  renderLogo() {
    return (
      <div class="flex flex-col items-center justify-center">
        <p class="font-medium text-xs tracking-[0.13em]">NFTS FOR</p>
        <p class="font-thin text-mxl tracking-[0.15em]">
          STARVING <br />
          CHILDREN
        </p>
      </div>
    );
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
        {/* TODO: add other routes here */}
      </>
    );
  }

  render() {
    return (
      <div class="flex flex-row">
        <Menu />
        <main class="bg-darkGray h-screen flex-1">
          <Routes />
        </main>
      </div>
    );
  }
}

export default AdminRoutes;
