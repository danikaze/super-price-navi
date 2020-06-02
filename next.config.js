const packageJson = require('./package.json');

const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * Read the constants to define as ENV vars from the secrets file
 * It will return an empty file if the file is not found or if the build is not for server side
 */
function getSecrets(isServer) {
  let res = {};
  try {
    if (isServer) {
      const secrets = require('./secrets');
      Object.entries(secrets).forEach(([key, value]) => {
        res[key] = JSON.stringify(value);
      });
    }
  } finally {
    return res;
  }
}

function getPort() {
  let port = 3000;
  const i = process.argv.indexOf('-p');
  if (i !== -1) {
    return Number(process.argv[i + 1]);
  }
  return port;
}

module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
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
        SERVER_PORT: getPort(),
        ...getSecrets(isServer),
      })
    );

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })
    );

    return config;
  },
};
