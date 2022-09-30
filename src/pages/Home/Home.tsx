import Nullstack, { NullstackNode } from "nullstack";
import Logo from "../../shared/Logo";

declare function Header(): NullstackNode;

class Home extends Nullstack {
  renderHeader() {
    return (
      <header class="flex flex-row items-center justify-between">
        <Logo />

        <nav class="flex flex-row">
          <p class="border-b border-b-yellow">Home</p>
          <p class="ml-5 font-thin">WTF?</p>
          <p class="ml-5 font-thin">Explore</p>
          <p class="ml-5 font-thin">TAPs</p>
        </nav>
      </header>
    );
  }

  render() {
    return (
      <>
        <div class="absolute z-[-1] w-full h-full min-h-screen bg-[url('/images/home/header.png')] bg-cover bg-no-repeat blur-sm opacity-70" />
        <main class="pt-[50px] w-full h-fit max-w-[1134px] mx-auto">
          <Header />
          <div class="flex flex-row items-center justify-between mt-[68px]">
            <div>
              <h1 class="text-[35px] leading-[44px] drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1 max-w-[420px]">
                Your kindness can make the world of a difference for a
                <span class="text-black bg-yellow">
                  {" "}
                  child's crypto wallet.
                </span>
              </h1>
              <p class="font-thin max-w-[420px] mt-[21px]">
                They may not have food, but you can help an NFT-less child with
                this buy one, give one opportunity. Every child deserves an NFT.
              </p>
            </div>
            <img
              src="/images/home/kid-one.png"
              class="w-[400px] border border-white border-[3px]"
            />
          </div>
        </main>
      </>
    );
  }
}

export default Home;
