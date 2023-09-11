export const packageJson = {
  name: "fxhash-project",
  version: "3.0.0",
  description: "A generative artwork",
  author: "fxhash",
  license: "MIT",
  scripts: {
    postinstall: "fxhash upgrade",
    start: "fxhash dev",
    build: "fxhash build",
  },
  devDependencies: {
    "@fxhash/fxhash-cli": "1.0.0",
  },
}
