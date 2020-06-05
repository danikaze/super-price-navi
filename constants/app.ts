export const APP_TITLE = 'Super Price Navi';

/**
 * SERVER_PORT is used for API calls, etc.
 * It's defined by the `-p` parameter when executing the NextJS app
 * Defaults to `3000`
 */
export const SERVER_PORT = ((): number => {
  const defaultPort = 3000;
  const i = process.argv.indexOf('-p');
  if (i !== -1) {
    return Number(process.argv[i + 1]);
  }
  return defaultPort;
})();

export const RESULTS_PER_PAGE_SHOPS = 10;
export const MAX_RESULTS_PER_PAGE_SHOPS = 20;
export const SEARCH_LOCATION_RADIUS_METERS = 1000;
