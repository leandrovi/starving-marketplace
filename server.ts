import Nullstack from "nullstack";
import Application from "./src/Application";
import Dependency, { ServerContext } from "./src/Dependency";

const context = Nullstack.start(Application) as ServerContext;

context.start = async function start() {
  await Dependency._start(context);
};

export default context;
