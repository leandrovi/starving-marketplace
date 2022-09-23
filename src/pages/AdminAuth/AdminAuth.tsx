import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";

import { AppClientContext } from "../../../client";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Logo from "../../shared/components/Logo";

class AdminAuth extends Nullstack {
  isAuthenticating: boolean;

  // TODO: add proper type after event type is fixed
  async authenticateAdmin(context) {
    this.isAuthenticating = true;

    const { event } = context;
    const { value: email } = event.target.email;
    const { value: password } = event.target.password;

    console.log({ email, password });

    // TODO: call mongo to fetch user details
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const walletAddress = "0x56f7fb68a7a63940";

    const account = await fcl
      .send([fcl.getAccount(walletAddress)])
      .then(fcl.decode);

    context.adminAccount = account;
    context.isAuthenticated = true;
    this.isAuthenticating = false;
    context.router.path = "/admin";
  }

  render() {
    return (
      <div class="flex flex-col items-center justify-center w-screen h-screen">
        <Logo />

        <form
          class="flex flex-col max-w-[500px] m-8 w-full"
          onsubmit={this.authenticateAdmin}
        >
          <Input label="E-mail" name="email" type="email" required={true} />
          <Input
            label="Password"
            name="password"
            type="password"
            required={true}
          />
          <Button bg="#FDC500" type="submit" isLoading={this.isAuthenticating}>
            Sign In
          </Button>
        </form>
      </div>
    );
  }
}

export default AdminAuth;
