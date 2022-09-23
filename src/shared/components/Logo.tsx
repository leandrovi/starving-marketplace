import Nullstack from "nullstack";

class Logo extends Nullstack {
  render() {
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
}

export default Logo;
