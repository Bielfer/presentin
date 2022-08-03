/* eslint no-console:off */
import { addPresentinMessage } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import type { NextApiResponse } from 'next';
import { z } from 'zod';
import { requestTimer, validateBody } from '@/helpers/middlewares';
import { NextApiRequestExtended } from '@/types/api';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

const bodySchema = z
  .object({
    senderName: z.string(),
    message: z.string().optional(),
    image: z.string().nullable(),
    donateCash: z.boolean(),
    cashAmount: z.number().nullable(),
    uid: z.string(),
  })
  .strict();

router.use(validateBody(bodySchema)).post(async (req, res) => {
  const { presentinId } = req.query;
  const { body } = req;

  const [messageRef, error] = await tryCatch(
    addPresentinMessage(presentinId as string, body)
  );

  if (error) {
    res
      .status(404)
      .json({ message: 'Failed to add message to presentin', error });
    return;
  }

  const messageDoc = messageRef?.get();
  const message = {
    ...(await messageDoc)?.data(),
    id: (await messageDoc)?.id,
  };

  res
    .status(200)
    .json({ message: 'Message added to presentin', data: message });
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
