import { NextApiRequest, NextApiResponse } from 'next';
import { SERVER_PORT } from '@constants/app';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    ['PACKAGE_NAME']: PACKAGE_NAME,
    ['PACKAGE_VERSION']: PACKAGE_VERSION,
    ['BUILD_ID']: BUILD_ID,
    ['COMMIT_HASH']: COMMIT_HASH,
    ['COMMIT_HASH_SHORT']: COMMIT_HASH_SHORT,
    ['IS_SERVER']: IS_SERVER,
    ['IS_PRODUCTION']: IS_PRODUCTION,
    ['SERVER_PORT']: SERVER_PORT,
  });
};
