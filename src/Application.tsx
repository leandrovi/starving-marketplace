import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack';
import '../tailwind.css';
import Home from './Home';

declare function Head(): NullstackNode

class Application extends Nullstack {

  prepare({ page }: NullstackClientContext) {
    page.locale = 'en-US';
  }

  renderHead() {
    return (
      <head>
        <link
          href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet" />
      </head>
    )
  }

  render() {
    return (
      <body class="bg-gray-900 text-white font-roboto">
        <Head />
        <Home route="/" greeting="Welcome to Nullstack!" />
      </body>
    )
  }

}

export default Application;