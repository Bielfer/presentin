import { addPresentinMessage } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import validateBody from '@/helpers/validateBody';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const { presentinId } = req.query;
  const { body } = req;

  switch (req.method) {
    case 'POST': {
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

      if (!validateBody(res, bodySchema, body)) break;

      const [messageRef, error] = await tryCatch(
        addPresentinMessage(presentinId as string, body)
      );

      if (error) {
        res
          .status(404)
          .json({ message: 'Failed to add message to presentin', error });
        break;
      }

      const messageDoc = messageRef?.get();
      const message = {
        ...(await messageDoc)?.data(),
        id: (await messageDoc)?.id,
      };

      res
        .status(200)
        .json({ message: 'Message added to presentin', data: message });
      break;
    }
    default: {
      res.status(405).json({ message: 'Invalid Request Method' });
      break;
    }
  }
};

export default route;
