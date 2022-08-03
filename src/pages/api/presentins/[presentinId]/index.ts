import { getPresentinById, updatePresentinById } from '@/db/presentin';
import tryCatch from '@/helpers/tryCatch';
import { getIdTokenData } from '@/services/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const { presentinId } = req.query;
  const { authorization } = req.headers;

  switch (req.method) {
    case 'GET': {
      const [doc, error] = await tryCatch(
        getPresentinById(presentinId as string)
      );

      if (error) {
        res.status(404).json({ message: 'Presentin not found', error });
        break;
      }

      const presentinData = doc?.data();
      const presentin = {
        ...presentinData,
        id: doc?.id,
        updatedAt: presentinData?.updatedAt.toDate(),
        createdAt: doc?.createTime?.toDate(),
      };

      res.status(200).json({ message: 'Presentin found', data: presentin });
      break;
    }

    case 'PATCH': {
      const [token, errorUnauthorized] = await tryCatch(
        getIdTokenData(authorization as string)
      );
      const uid = token?.uid;

      if (errorUnauthorized) {
        res
          .status(401)
          .json({ message: 'You are not logged in', error: errorUnauthorized });
        break;
      }

      const [, error] = await tryCatch(
        updatePresentinById(presentinId as string, uid ?? '', body)
      );

      if (error) {
        res.status(400).json({ message: 'Failed to update Presentin', error });
        break;
      }

      res.status(200).json({ message: 'Presentin updated' });
      break;
    }

    default: {
      res.status(405).json({ error: 'Invalid Request Method' });
      break;
    }
  }
};

export default route;
