/* eslint no-console:off */
import { addPresentin } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import { PresentinStatus } from '@/types/presentin';
import { z } from 'zod';
import {
  isAuthenticated,
  requestTimer,
  validateBody,
} from '@/helpers/middlewares';
import { NextApiRequestExtended } from '@/types/api';
import type { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

const bodySchema = z
  .object({
    recipientName: z.string(),
    title: z.string(),
    collectCash: z.boolean(),
    groupName: z.string(),
  })
  .strict();

router
  .use(validateBody(bodySchema))
  .use(isAuthenticated)
  .post(async (req, res) => {
    const { body, token } = req;

    const [data, error] = await tryCatch(
      addPresentin({
        ...body,
        uid: token?.uid,
        status: PresentinStatus.Open,
      })
    );

    const presentinDoc = await data?.get();
    const presentin = {
      ...presentinDoc?.data(),
      id: presentinDoc?.id,
    };

    if (error) {
      res.status(400).json({ message: 'Failed to create Presentin', error });
    }

    res.status(200).json({ message: 'Presentin created!', data: presentin });
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
