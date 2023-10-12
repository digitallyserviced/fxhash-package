import CopyPlugin from "copy-webpack-plugin"
import path from "path"
import { ZipperPlugin } from "./plugins/ZipperPlugin"
import { createBaseConfig, WebpackConfigFactory } from "./webpack.config"
import { getProjectPaths } from "../templates/paths"
import TerserPlugin from "terser-webpack-plugin"

export const createProdConfig: WebpackConfigFactory = options => {
  const { srcPath, minify, zippify, rootPath } = options
  const baseConfig = createBaseConfig(options)
  const { staticPath, distPath } = getProjectPaths(srcPath, rootPath)
  const zipFilePath = baseConfig.output.path + ".zip"
  return {
    ...baseConfig,
    mode: "production",
    optimization: {
      minimize: minify,
      minimizer: [
        // Never minify the @fxhash/project-sdk
        new TerserPlugin({
          exclude: /.*fxhash\.js.*/,
        }),
      ],
    },
    // add the zipper plugin to the list of plugins
    plugins: [
      ...baseConfig.plugins,
      staticPath !== baseConfig.output.path &&
        new CopyPlugin({
          patterns: [
            {
              from: staticPath,
              filter: async filePath => {
                const filesNotToCopy = [zipFilePath]
                const foldersNotToCopy = [distPath]
                if (filesNotToCopy.some(file => filePath === file)) return false
                if (
                  foldersNotToCopy.some(
                    folder => path.dirname(filePath) === folder
                  )
                )
                  return false
                return true
              },
            },
          ],
        }),
      zippify && new ZipperPlugin({ zipPath: zipFilePath }),
    ].filter(p => !!p),
  }
}
