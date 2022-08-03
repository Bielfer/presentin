import { addPresentin } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import validateBody from '@/helpers/validateBody';
import { getServerTimestamp } from '@/services/firebase/admin';
import { PresentinStatus } from '@/types/presentin';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  switch (req.method) {
    case 'POST': {
      const bodySchema = z
        .object({
          uid: z.string(),
          recipientName: z.string(),
          title: z.string(),
          collectCash: z.boolean(),
          groupName: z.string(),
        })
        .strict();

      if (!validateBody(res, bodySchema, body)) break;

      const [data, error] = await tryCatch(
        addPresentin({
          ...body,
          updatedAt: getServerTimestamp(),
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
        break;
      }

      res.status(200).json({ message: 'Presentin created!', data: presentin });
      break;
    }
    default: {
      res.status(405).json({ message: 'Invalid Request Method' });
      break;
    }
  }
};

export default route;
