import Nullstack, { NullstackServerContext } from "nullstack";
import Application from "./src/Application";
import Dependency from "./src/Dependency";

const context = Nullstack.start(Application) as NullstackServerContext;

context.start = async function start() {
  await Dependency._start(context);
};

export default context;
