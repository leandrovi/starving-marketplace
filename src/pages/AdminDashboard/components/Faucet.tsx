import Nullstack, { NullstackNode } from "nullstack";
import * as fcl from "@onflow/fcl";

const GET_TAP_BALANCE: string = require("../../../../cadence/scripts/GetTAPBalance.cdc");
const MINT_TAPS: string = require("../../../../cadence/transactions/MintTAPs.cdc");

import IconTitle from "./IconTitle";
import Button from "../../../shared/Button";
import { AppClientContext } from "../../../../client";

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
  successMessage: string;

  // TODO: add correct type
  onWalletChange({ event }) {
    const wallet = event.target.value;
    this.walletAddress = wallet;
  }

  async getAccountBalance(): Promise<number> {
    try {
      const result = await fcl.query({
        cadence: GET_TAP_BALANCE,
        args: (arg, t) => [arg(this.walletAddress, t.Address)],
      });

      return Number(result);
    } catch (err) {
      // Balance (Receiver Capability) doesn't exist
      // User needs to sign up and setup the account
      console.log({ err });
    }
  }

  async depositTAPs() {
    try {
      const transactionId = await fcl.mutate({
        cadence: MINT_TAPS,
        args: (arg, t) => [
          arg(this.walletAddress, t.Address),
          arg(this.taps, t.UFix64),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 100,
      });

      await fcl.tx(transactionId).onceSealed();
    } catch (err) {
      // The user doesn't have the TAP Vault yet
      // User needs to sign up and setup the account
      console.log({ err });
    }
  }

  async mintAndSend(context: AppClientContext) {
    try {
      this.isLoading = true;
      await this.depositTAPs();
      const balance = await this.getAccountBalance();

      this.walletAddress = undefined;
      this.taps = undefined;
      this.successMessage = `Now your balance is ${balance} TAP 🎉`;
    } catch (err) {
      console.log({ err });
    } finally {
      this.isLoading = false;
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
        <div class="flex flex-row align-center mt-12">
          <Button
            isLoading={this.isLoading}
            onclick={this.mintAndSend}
            disabled={!this.walletAddress || !this.taps}
          >
            Mint & Send
          </Button>
          {this.successMessage && (
            <p class="font-thin ml-4 self-center">{this.successMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

export default Faucet;
