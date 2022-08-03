/* eslint no-console:off */
import { getPresentinById, updatePresentinById } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import type { NextApiResponse } from 'next';
import { z } from 'zod';
import {
  isAuthenticated,
  requestTimer,
  validateBody,
} from '@/helpers/middlewares';
import { NextApiRequestExtended } from '@/types/api';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

router.get(async (req, res) => {
  const { presentinId } = req.query;

  const [doc, error] = await tryCatch(getPresentinById(presentinId as string));

  if (error) {
    res.status(404).json({ message: 'Presentin not found', error });
    return;
  }

  const presentinData = doc?.data();
  const presentin = {
    ...presentinData,
    id: doc?.id,
    updatedAt: presentinData?.updatedAt.toDate(),
    createdAt: doc?.createTime?.toDate(),
  };

  res.status(200).json({ message: 'Presentin found', data: presentin });
});

const bodySchema = z
  .object({
    recipientName: z.string().optional(),
    title: z.string().optional(),
    groupName: z.string().optional(),
  })
  .strict();

router
  .use(validateBody(bodySchema))
  .use(isAuthenticated)
  .patch(async (req, res) => {
    const { presentinId } = req.query;
    const { body } = req;

    const uid = req.token?.uid;
    const [, error] = await tryCatch(
      updatePresentinById(presentinId as string, uid ?? '', body)
    );

    if (error) {
      res.status(400).json({ message: 'Failed to update Presentin', error });
      return;
    }

    res.status(200).json({ message: 'Presentin updated' });
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
