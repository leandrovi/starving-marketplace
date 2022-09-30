import Nullstack from "nullstack";
import fileUpload from "express-fileupload";

import Application from "./src/Application";
import Dependency, { ServerContext } from "./src/Dependency";

const context = Nullstack.start(Application) as ServerContext;

context.start = async function start() {
  await Dependency._start(context);
};

context.server.use(fileUpload());
context.server.post("/files", async (_, response) => {
  response.json({ ok: true });
});

export { ServerContext };
export default context;
