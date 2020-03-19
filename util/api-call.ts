import axios, { AxiosResponse } from 'axios';
import { HttpMethod, ScalarKeyValue } from 'types/shared';

/**
 * List of available APIs
 */
export type ApiCallApiType = string;

export interface ApiCallOptions<
  P extends ScalarKeyValue = never,
  B extends {} = never
> {
  /**
   * Method to use in the call. 'GET' by default
   */
  method?: HttpMethod;
  /**
   * Data to pass in the query string
   */
  params?: P;
  /**
   * Data to pass in the body
   */
  data?: B;
  /**
   * Milliseconds before timing-out (falsy or <0 value to disable)
   * Default is 30 seconds.
   */
  timeout?: number;
}

if (IS_SERVER) {
  axios.defaults.baseURL = `http://localhost:${SERVER_PORT}`;
}
axios.defaults.method = 'GET';
axios.defaults.timeout = 30000; // tslint:disable-line:no-magic-numbers

/**
 * Make a call to the specified internal API.
 * Internal APIs are all in `/pages/api/${path}`, so only the `path` is required
 * They also all share JSON interfaces in accepted parameters and returned data
 */
export function apiCall<
  R extends {},
  Q extends ScalarKeyValue = never,
  B extends {} = never
>(
  api: ApiCallApiType,
  options?: ApiCallOptions<Q, B>
): Promise<AxiosResponse<R>> {
  return axios.request<R>({
    ...options,
    url: `api/${api}`,
  });
}
