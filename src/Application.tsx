import Nullstack, { NullstackClientContext, NullstackNode } from "nullstack";
import { Web3Storage } from "web3.storage";
import { AppClientContext } from "../client";
import "../tailwind.css";
import Home from "./pages/Home/Home";

import AdminRoutes from "./routes/AdminRoutes";

declare function Head(): NullstackNode;
declare function HomeRoutes(): NullstackNode;

class Application extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.locale = "en-US";
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;500&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css"
          type="text/css"
        />
        <title>Starving Marketplace</title>
      </head>
    );
  }

  // This is temporary while I focus on the admin
  renderHomeRoutes() {
    return <Home />;
  }

  render() {
    return (
      <body class="bg-black text-white font-kanit min-h-screen">
        <Head />
        <HomeRoutes route="/" />
        <AdminRoutes route="/admin/*" />
      </body>
    );
  }
}

export default Application;
