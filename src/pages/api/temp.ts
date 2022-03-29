import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { prisma } from '../../services/prisma'

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const data = await prisma.register.findMany({
      include: {
        teacher: true,
        students: true
      }
    })

    res.json({ data })
  })
  .delete(async (req, res) => {
    const { id } = req.query as { id: string }
    await prisma.register.delete({
      where: {
        id: +id
      }
    })

    res.json({ message: 'Deleted' })
  })

export default handler
