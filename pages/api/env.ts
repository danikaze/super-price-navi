import { NextApiRequest, NextApiResponse } from 'next';
import * as appConstants from '@constants/app';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // tslint:disable:no-any
  const data = {
    ['PACKAGE_NAME']: PACKAGE_NAME,
    ['PACKAGE_VERSION']: PACKAGE_VERSION,
    ['BUILD_ID']: BUILD_ID,
    ['COMMIT_HASH']: COMMIT_HASH,
    ['COMMIT_HASH_SHORT']: COMMIT_HASH_SHORT,
    ['IS_SERVER']: IS_SERVER,
    ['IS_PRODUCTION']: IS_PRODUCTION,
  } as any;

  Object.entries(appConstants).reduce((data, [key, value]) => {
    data[key] = value;
    return data;
  }, data);

  res.json(data);
};
