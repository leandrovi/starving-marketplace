import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";

import { AppClientContext } from "../../../client";
import Button from "../../shared/Button";
import Logo from "../../shared/Logo";
import { FlowUser } from "../../appTypes/flow";
import { UserModel } from "../../models/UserModel";

class AdminAuth extends Nullstack {
  isAuthenticating = false;
  error = "";

  static async fetchUser({ walletAddress }) {
    try {
      return await UserModel.findOne({
        walletAddress: walletAddress,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async hydrate(context: AppClientContext) {
    fcl.currentUser.subscribe(async (flowUser: FlowUser) => {
      if (flowUser.addr) {
        // @ts-ignore
        const appUser = await this.fetchUser({ walletAddress: flowUser.addr });

        // Treat cases where user doesn't have an account yet
        if (this.isAuthenticating && !appUser) {
          this.error = "Ops, it looks like you don't have an account";
          this.isAuthenticating = false;
          context.isAuthenticated = false;
          fcl.unauthenticate();
          return;
        }

        // Treat cases where user is trying to log in as non admin
        if (this.isAuthenticating && appUser.role !== "admin") {
          this.error =
            "Ops, it looks like you're not an admin, please try again with a different account.";
          this.isAuthenticating = false;
          context.isAuthenticated = false;
          fcl.unauthenticate();
          return;
        }

        // User has addr and user is admin
        this.isAuthenticating = false;
        context.isAuthenticated = true;
        context.adminUser = flowUser;
        context.router.path = "/admin";
      }
    });
  }

  async authenticateAdmin() {
    this.isAuthenticating = true;
    this.error = "";

    const currentUser = await fcl.currentUser.snapshot();

    if (!currentUser.addr) {
      fcl.authenticate();
      return;
    }
  }

  render() {
    return (
      <div class="flex flex-col items-center justify-center w-screen h-screen">
        <Logo />

        <div class="flex flex-col max-w-[500px] m-8 w-full">
          <Button
            bg="#FDC500"
            onclick={this.authenticateAdmin}
            isLoading={this.isAuthenticating}
          >
            Admin Sign In
          </Button>

          {!!this.error && (
            <p class="text-red font-thin text-center">{this.error}</p>
          )}
        </div>
      </div>
    );
  }
}

export default AdminAuth;
