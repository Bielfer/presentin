/* eslint no-console:off */
import { deletePresentinMessage } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import type { NextApiResponse } from 'next';
import { isAuthenticated, requestTimer } from '@/helpers/middlewares';
import { NextApiRequestExtended } from '@/types/api';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

router.use(isAuthenticated).delete(async (req, res) => {
  const { presentinId, messageId } = req.query;
  const uid = req.token?.uid;

  const [, error] = await tryCatch(
    deletePresentinMessage(
      uid ?? '',
      presentinId as string,
      messageId as string
    )
  );

  if (error) {
    res.status(400).json({ message: 'Failed to delete presentin' });
    return;
  }

  res.status(200).json({ message: 'Deleted message successfully' });
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
