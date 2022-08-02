import { addPresentin } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import type { NextApiRequest, NextApiResponse } from 'next';

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  switch (req.method) {
    case 'POST': {
      const [data, error] = await tryCatch(addPresentin(body));

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
