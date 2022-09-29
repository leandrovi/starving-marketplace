import Nullstack from "nullstack";
import fileUpload from "express-fileupload";

import Application from "./src/Application";
import Dependency, { ServerContext } from "./src/Dependency";

const context = Nullstack.start(Application) as ServerContext;

context.start = async function start() {
  await Dependency._start(context);
};

context.server.use(fileUpload());

context.server.post("/files", async (request, response) => {
  const { files } = request;
  const { file } = files;
  // const cid = await context.web3StorageClient.put([file]);
  const cid = "1234";
  console.log("stored file with cid:", cid);
  response.json({ file: { ...file, cid } });
});

export { ServerContext };
export default context;
