import Nullstack, { NullstackNode } from "nullstack";
import * as fcl from "@onflow/fcl";

const GET_TAP_BALANCE: string = require("../../../../cadence/scripts/GetTAPBalance.cdc");
const SETUP_TAP_ACCOUNT: string = require("../../../../cadence/transactions/SetupTAPAccount.cdc");
const MINT_TAPS: string = require("../../../../cadence/transactions/MintTAPs.cdc");

import IconTitle from "./IconTitle";
import Button from "../../../shared/components/Button";
import { AppClientContext } from "../../../../client";
import { Account } from "../../../appTypes/flow";

interface InputProps {
  name: string;
  label: string;
  value: string;
  placeholder: string;
}

declare function Input(): NullstackNode;
declare function QuantityInput(): NullstackNode;

class Faucet extends Nullstack {
  walletAddress: string;
  taps: 0;
  isLoading = false;

  async hydrate({ bind }: AppClientContext) {
    const walletInputValue = bind.object[bind.property];
    this.walletAddress = walletInputValue;
  }

  // TODO: add correct type
  onWalletChange({ event }) {
    const wallet = event.target.value;
    this.walletAddress = wallet;
  }

  async mintAndSend(context: AppClientContext) {
    try {
      this.isLoading = true;

      const account = await fcl
        .send([fcl.getAccount(this.walletAddress)])
        .then(fcl.decode);

      const balance = await this.getAccountBalance();
      console.log({ balance });
      await this.depositTAPs(context);
    } catch (err) {
      // TODO: handle errors -> user didn't setup the account yet
      console.log({ err });
    } finally {
      this.isLoading = false;
    }
  }

  async getAccountBalance(): Promise<number> {
    try {
      const result = await fcl.query({
        cadence: GET_TAP_BALANCE,
        args: (arg, t) => [arg(this.walletAddress, t.Address)],
      });

      return Number(result);
    } catch (error) {
      // Balance doesn't exist - user needs to sign up and setup the account
      console.log({ error });
    }
  }

  async depositTAPs({ adminAccount }: AppClientContext) {
    console.log({ adminAccount });
    try {
      // const transactionId = await fcl.mutate({
      //   cadence: MINT_TAPS,
      //   args: (arg, t) => [
      //     // arg(this.walletAddress, t.Address),
      //     arg(this.taps, t.UFix64),
      //   ],
      //   proposer: adminAccount,
      //   payer: adminAccount,
      //   authorizations: [adminAccount],
      //   limit: 50,
      // });
      // const result = await fcl.tx(transactionId).onceSealed();
      // console.log({ result });
    } catch (err) {
      // TODO: treat errors
      console.log({ err });
    }
  }

  renderInput({ name, label, placeholder }: AppClientContext<InputProps>) {
    return (
      <div class="flex flex-col mt-8">
        <label class="text-2xl drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1">
          {label}
        </label>
        <input
          class="bg-darkGray border border-color-white py-[18px] px-6 font-thin text-lg"
          type="text"
          name={name}
          placeholder={placeholder}
          oninput={this.onWalletChange}
        />
      </div>
    );
  }

  renderQuantityInput() {
    return (
      <div class="flex flex-row mt-8 items-center justify-between">
        <div>
          <label class="text-2xl drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1">
            Quantity
          </label>
          <p class="font-thin text-base text-lightGray">
            Put the quantity of TAPs they'll need
          </p>
        </div>

        <div class="flex flex-row border border-color-white">
          <div class="flex items-center justify-center p-4 border-r">
            <img src="/icons/drop.svg" class="max-w-[14px]" />
          </div>
          <div class="flex items-center justify-center">
            <input
              placeholder="1.34"
              class="max-w-[80px] bg-darkGray p-3 font-bold text-[18px] text-center"
              bind={this.taps}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="max-w-[540px]">
        <IconTitle iconSrc="/icons/faucet.svg" iconAlt="Faucet">
          Faucet
        </IconTitle>
        <Input
          label="Address"
          placeholder="Enter the Wallet address (0x...) or ENS Domain"
        />
        <QuantityInput />
        <Button
          isLoading={this.isLoading}
          onclick={this.mintAndSend}
          disabled={!this.walletAddress || !this.taps}
        >
          Mint & Send
        </Button>
      </div>
    );
  }
}

export default Faucet;
