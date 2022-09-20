import Nullstack, { NullstackServerContext } from "nullstack";

class Dependency extends Nullstack {
  static async _start(context: NullstackServerContext) {
    console.log({ context });
  }
}

export default Dependency;
