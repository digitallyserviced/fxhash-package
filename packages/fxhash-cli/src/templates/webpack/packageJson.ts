export const packageJson = {
  name: "fxhash-webpack-template",
  version: "2.0.0",
  description:
    "The fxhash boilerplate, comes with some utilities to create a project for fxhash",
  scripts: {
    postinstall: "node ./lib/scripts/install.js",
    start: "node ./lib/scripts/start.js",
    "start:project":
      "webpack serve --config ./lib/config/webpack.config.dev.js",
    build: "webpack --config ./lib/config/webpack.config.prod.js",
  },
  author: "fxhash",
  license: "MIT",
  devDependencies: {
    "adm-zip": "^0.5.9",
    chalk: "^4.1.2",
    "copy-webpack-plugin": "^11.0.0",
    "css-loader": "^6.7.1",
    dotenv: "^16.0.3",
    express: "^4.18.2",
    "github-download-directory": "^3.0.0",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    webpack: "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.11.1",
  },
}
