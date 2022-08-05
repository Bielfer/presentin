/* eslint no-console:off */
import { getUserById } from '@/db/user';
import {
  isAuthenticated,
  requestTimer,
  uidMatchesUserId,
} from '@/helpers/middlewares';
import tryCatch from '@/helpers/tryCatch';
import { NextApiRequestExtended } from '@/types/api';
import type { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

router
  .use(isAuthenticated)
  .use(uidMatchesUserId)
  .get(async (req, res) => {
    const { token } = req;

    const [userDoc, error] = await tryCatch(getUserById(token?.uid ?? ''));

    if (error) {
      res.status(400).json({ message: 'Failed to get content', error });
      return;
    }

    const user = {
      ...userDoc?.data(),
      id: userDoc?.id,
      updatedAt: userDoc?.data()?.updatedAt.toDate(),
    };

    res.status(200).json({ message: 'Successfully got user', data: user });
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end('Server error!');
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ message: 'Invalid Request Method' });
  },
});
