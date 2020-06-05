/*
 * Constants set in the webpack build for both client and server side
 */
/** Env constant set to (package.json).name */
declare const PACKAGE_NAME: string;
/** Env constant set to (package.json).version */
declare const PACKAGE_VERSION: string;
/** Env constant set to the build ID */
declare const BUILD_ID: string;
/** Env constant set to the git commit hash */
declare const COMMIT_HASH: string;
/** Env constant set to the 7 first characters of the git commit hash */
declare const COMMIT_HASH_SHORT: string;
/** Env constant set to `true` for the code to use in server side, `false` for the one delivered to the client */
declare const IS_SERVER: boolean;
/** Env constant set to `true` for the production build, `false` for development */
declare const IS_PRODUCTION: boolean;
