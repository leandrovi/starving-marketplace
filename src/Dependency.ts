import Nullstack, { NullstackServerContext } from "nullstack";
import mongoose from "mongoose";

export interface ServerContext extends NullstackServerContext {
  database: typeof mongoose;
}

class Dependency extends Nullstack {
  static async _start(context: ServerContext) {
    const { secrets } = context;
    const mongoConn = await mongoose.connect(secrets.mongoUrl as string);
    context.database = mongoConn;
  }
}

export default Dependency;
