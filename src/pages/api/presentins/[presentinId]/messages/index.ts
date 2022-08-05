/* eslint no-console:off */
import { addPresentinMessage, getPresentinMessages } from '@/db/presentin';
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
import { PresentinMessage } from '@/types/presentin';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

router.get(async (req, res) => {
  const { presentinId } = req.query;

  const [snapshot, error] = await tryCatch(
    getPresentinMessages(presentinId as string)
  );

  const presentinMessages: PresentinMessage[] = [];

  snapshot?.forEach((doc) => {
    presentinMessages.push({
      ...(doc.data() as PresentinMessage),
      id: doc.id,
      updatedAt: doc.data().updatedAt.toDate(),
    });
  });

  if (error) {
    res.status(400).json({ message: 'Failed to get messages', error });
    return;
  }

  res.status(200).json({
    message: 'Successfully got presentin messages',
    data: presentinMessages,
  });
});

const bodySchema = z
  .object({
    senderName: z.string(),
    message: z.string().optional(),
    image: z.string().nullable(),
    donateCash: z.boolean(),
    cashAmount: z.number().nullable(),
  })
  .strict();

router
  .use(validateBody(bodySchema))
  .use(isAuthenticated)
  .post(async (req, res) => {
    const { presentinId } = req.query;
    const { body, token } = req;

    const [messageRef, error] = await tryCatch(
      addPresentinMessage(presentinId as string, { ...body, uid: token?.uid })
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
