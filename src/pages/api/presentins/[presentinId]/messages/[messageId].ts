import { deletePresentinMessage } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import { getIdTokenData } from '@/services/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers;
  const { presentinId, messageId } = req.query;

  switch (req.method) {
    case 'DELETE': {
      const [token, errorUnauthorized] = await tryCatch(
        getIdTokenData(authorization ?? '')
      );

      if (errorUnauthorized) {
        res.status(401).json({
          message: 'You do not have permission to access message',
          error: errorUnauthorized,
        });
        break;
      }

      const uid = token?.uid;
      const [, error] = await tryCatch(
        deletePresentinMessage(
          uid ?? '',
          presentinId as string,
          messageId as string
        )
      );

      if (error) {
        res.status(400).json({ message: 'Failed to delete presentin' });
        break;
      }

      res.status(200).json({ message: 'Deleted message successfully' });
      break;
    }
    default: {
      res.status(405).json({ message: 'Invalid Request Method' });
      break;
    }
  }
};

export default route;
