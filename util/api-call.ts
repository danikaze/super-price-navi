import axios, { AxiosResponse } from 'axios';
import { HttpMethod, ScalarKeyValue } from '@td/shared';
import { SERVER_PORT } from '@constants/app';

// TODO: Properly full-type all APIs based on their url
// tslint:disable:no-any

/**
 * List of available APIs
 */
export type ApiCallApiType = string;

export interface ApiCallOptions<
  P extends ScalarKeyValue = any,
  B extends {} = any
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
  axios.defaults.baseURL = `http://localhost:${SERVER_PORT}/`;
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
  P extends ScalarKeyValue = any,
  B extends {} = any
>(
  api: ApiCallApiType,
  options?: ApiCallOptions<P, B>
): Promise<AxiosResponse<R>> {
  return axios.request<R>({
    ...options,
    url: `/api/${api}`,
  });
}
