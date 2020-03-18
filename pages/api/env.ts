import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // tslint:disable-next-line:no-magic-numbers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      ['PACKAGE_NAME']: PACKAGE_NAME,
      ['PACKAGE_VERSION']: PACKAGE_VERSION,
      ['BUILD_ID']: BUILD_ID,
      ['COMMIT_HASH']: COMMIT_HASH,
      ['COMMIT_HASH_SHORT']: COMMIT_HASH_SHORT,
      ['IS_SERVER']: IS_SERVER,
      ['IS_PRODUCTION']: IS_PRODUCTION,
      ['SERVER_PORT']: SERVER_PORT,
    })
  );
};
