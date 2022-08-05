/* eslint no-console:off */
import { addUser } from '@/db/user';
import {
  isAuthenticated,
  requestTimer,
  validateBody,
} from '@/helpers/middlewares';
import tryCatch from '@/helpers/tryCatch';
import { NextApiRequestExtended } from '@/types/api';
import type { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { z } from 'zod';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

const bodySchema = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
  })
  .strict();

router
  .use(validateBody(bodySchema))
  .use(isAuthenticated)
  .post(async (req, res) => {
    const { body, token } = req;
    const userData = { ...body, balance: 0 };

    const [, error] = await tryCatch(addUser(token?.uid ?? '', userData));

    if (error) {
      res.status(400).json({ message: '', error });
      return;
    }

    const user = {
      ...userData,
      id: token?.uid,
    };

    res.status(200).json({ message: 'User successfully created', data: user });
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
