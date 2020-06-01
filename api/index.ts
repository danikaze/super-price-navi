import { NextApiHandler, NextApiResponse } from 'next';
import { HttpMethod } from '@td/shared';
import { IncomingMessage } from 'http';
import { Env } from 'next/dist/lib/load-env-config';
import { HttpStatus } from '@api/http-codes';

// TODO: Proper type this unknown
export type RestApiHandlerMethods = Partial<Record<HttpMethod, unknown>>;

/* Redeclaration of NextApiRequest to provide typings on `query` and `body` */
export interface ApiRequest<Q, B> extends IncomingMessage {
  query: Q;
  body: B;
  cookies: {
    [key: string]: string;
  };
  env: Env;
}

/* Redeclaration of NextApiHandler to provide typings on `query` and `body` */
export type ApiHandler<R = void, Q extends {} = {}, B extends {} = {}> = (
  req: ApiRequest<Q, B>,
  res: NextApiResponse<R>
) => void | Promise<void>;

export function restApiHandler(
  handlers: RestApiHandlerMethods
): NextApiHandler {
  return async (req, res) => {
    const handler = handlers[req.method as HttpMethod] as NextApiHandler;
    if (!handler) {
      res.status(HttpStatus.NOT_FOUND).end();
      return;
    }

    try {
      await handler(req, res);
    } catch (error) {
      apiError(res, error);
    }
  };
}

export function apiError<E extends Error = Error>(
  res: NextApiResponse,
  error: E
): void {
  res.status(HttpStatus.OK).json({
    error: true,
    msg: String(error),
  });
}
