/* eslint no-console:off */
import { updatePresentinById } from '@/db/presentin';
import { isAuthenticated, requestTimer } from '@/helpers/middlewares';
import tryCatch from '@/helpers/tryCatch';
import { NextApiRequestExtended } from '@/types/api';
import { PresentinStatus } from '@/types/presentin';
import type { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequestExtended, NextApiResponse>().use(
  requestTimer
);

router.use(isAuthenticated).post(async (req, res) => {
  const { presentinId } = req.query;
  const uid = req.token?.uid;

  const [, error] = await tryCatch(
    updatePresentinById(presentinId as string, uid ?? '', {
      status: PresentinStatus.Sent,
    })
  );

  if (error) {
    res.status(400).json({ message: 'Failed to send presentin', error });
    return;
  }

  res.status(200).json({ message: 'Presentin sent successfully' });
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
