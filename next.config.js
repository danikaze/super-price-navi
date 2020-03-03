const packageJson = require('./package.json');

const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  compress: true,
  webpack: (config, { buildId, dev, isServer, webpack }) => {
    config.plugins.push(
      gitRevisionPlugin,
      new webpack.DefinePlugin({
        PACKAGE_NAME: JSON.stringify(packageJson.name),
        PACKAGE_VERSION: JSON.stringify(packageJson.version),
        BUILD_ID: JSON.stringify(buildId),
        COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
        COMMIT_HASH_SHORT: JSON.stringify(
          gitRevisionPlugin.commithash().substr(0, 7)
        ),
        IS_SERVER: isServer,
        IS_PRODUCTION: !dev,
      })
    );

    return config;
  },
};
