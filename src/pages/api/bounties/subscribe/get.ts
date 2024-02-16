import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await prisma.subscribeBounty.findMany({
      where: {
        bountyId: req.body.listingId,
        isArchived: false,
      },
      include: {
        User: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log('file: create.ts:31 ~ user ~ error:', error);
    res.status(400).json({
      error,
      message: 'Error occurred while adding a new bounty.',
    });
  }
}
