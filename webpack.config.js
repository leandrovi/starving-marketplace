const [server, client] = require("nullstack/webpack.config");
const { applyCadencePlugin } = require("cadence-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

function customClient(...args) {
  const config = client(...args);
  const rule = config.module.rules.find((rule) => rule.test.test(".css"));
  rule.use.push({
    loader: require.resolve("postcss-loader"),
    options: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
        },
      },
    },
  });
  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/dropzone/dist",
          to: config.output.path,
        },
      ],
    })
  );
  return config;
}

module.exports = applyCadencePlugin([server, customClient]);
