import Nullstack, { NullstackClientContext, NullstackNode } from "nullstack";

interface TitleProps {
  iconSrc: string;
  iconAlt: string;
}

interface InputProps {
  label: string;
  placeholder: string;
}

declare function Title(): NullstackNode;
declare function Input(): NullstackNode;
declare function QuantityInput(): NullstackNode;

class AdminDashboard extends Nullstack {
  walletAddress: string;
  taps: 0;

  connectWallet() {
    console.log(this.walletAddress);
    console.log(this.taps);
  }

  renderTitle({
    iconSrc,
    iconAlt,
    children,
  }: NullstackClientContext<TitleProps>) {
    return (
      <div class="flex flex-row items-center">
        <img class="w-full max-w-[40px] mr-4" src={iconSrc} alt={iconAlt} />
        <h2 class="text-3xl drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]">
          {children}
        </h2>
      </div>
    );
  }

  renderInput({ label, placeholder }: NullstackClientContext<InputProps>) {
    return (
      <div class="flex flex-col mt-8">
        <label class="text-2xl drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1">
          {label}
        </label>
        <input
          class="bg-darkGray border border-color-white py-[18px] px-6 font-thin text-lg"
          type="text"
          placeholder={placeholder}
          bind={this.walletAddress}
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
            <img src="/icons/drop.png" class="max-w-[14px]" />
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
      <section class="px-[9.75rem] py-[7.891rem]">
        <div class="max-w-[540px]">
          <Title iconSrc="/icons/faucet.png" iconAlt="Faucet">
            Faucet
          </Title>
          <Input
            label="Address"
            placeholder="Enter your Wallet address (0x...) or ENS Domain"
          />
          <QuantityInput />
          <button
            onclick={this.connectWallet}
            class="active:brightness-50 mt-12 bg-pink text-black font-bold text-[18px] py-[18px] px-[27.5px] hover:brightness-90 ease-linear duration-200"
          >
            Mint & Send
          </button>
        </div>
      </section>
    );
  }
}

export default AdminDashboard;
