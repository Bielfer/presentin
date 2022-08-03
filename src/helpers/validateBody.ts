import type { NextApiResponse } from 'next';

const validateBody = (res: NextApiResponse, schema: any, body: any) => {
  const bodyValidation = schema.safeParse(body);

  if (!bodyValidation.success) {
    res.status(400).json({
      message: 'Invalid body',
      error: bodyValidation.error.format(),
    });

    return false;
  }

  return true;
};

export default validateBody;
