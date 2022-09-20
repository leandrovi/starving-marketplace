import Nullstack, { NullstackServerContext } from "nullstack";

class Dependency extends Nullstack {
  static async _start(context: NullstackServerContext) {
    const {
      secrets: { mongoUrl },
    } = context;
  }
}

export default Dependency;
