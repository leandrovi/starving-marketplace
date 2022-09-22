import Nullstack, { NullstackNode } from "nullstack";
import * as fcl from "@onflow/fcl";

import IconTitle from "./IconTitle";
import Button from "../../../shared/components/Button";
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

  async launch({ bind }: AppClientContext) {
    const walletInputValue = bind.object[bind.property];
    this.walletAddress = walletInputValue;
  }

  // TODO: add correct type
  onWalletChange({ event }) {
    const wallet = event.target.value;
    this.walletAddress = wallet;
  }

  async connectWallet(context: AppClientContext) {
    this.isLoading = true;
    const { bind } = context;

    const account = await fcl
      .send([fcl.getAccount(this.walletAddress)])
      .then(fcl.decode);

    bind.object[bind.property] = this.walletAddress;
    localStorage.setItem("walletAddress", this.walletAddress);

    context.adminAccount = account;
    this.isLoading = false;
    console.log({ context });
  }

  renderInput({
    name,
    label,
    value,
    placeholder,
  }: AppClientContext<InputProps>) {
    return (
      <div class="flex flex-col mt-8">
        <label class="text-2xl drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1">
          {label}
        </label>
        <input
          class="bg-darkGray border border-color-white py-[18px] px-6 font-thin text-lg"
          type="text"
          name={name}
          value={value}
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
            Put the quantity of TAPs you’ll need
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

  render({ bind }: AppClientContext) {
    const walletInputName = bind.property;
    const walletInputValue = bind.object[bind.property];

    return (
      <div class="max-w-[540px]">
        <IconTitle iconSrc="/icons/faucet.svg" iconAlt="Faucet">
          Faucet
        </IconTitle>
        <Input
          name={walletInputName}
          value={walletInputValue}
          label="Address"
          placeholder="Enter your Wallet address (0x...) or ENS Domain"
        />
        <QuantityInput />
        <Button isLoading={this.isLoading} onclick={this.connectWallet}>
          Mint & Send
        </Button>
      </div>
    );
  }
}

export default Faucet;
