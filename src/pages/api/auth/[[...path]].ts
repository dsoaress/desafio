import { Request, Response } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import supertokens from 'supertokens-node'
import { middleware } from 'supertokens-node/framework/express'
import { superTokensNextWrapper } from 'supertokens-node/nextjs'

import { backendConfig } from '../../../../config/backendConfig'

supertokens.init(backendConfig())

export default async function superTokens(
  req: NextApiRequest & Request,
  res: NextApiResponse & Response
) {
  // NOTE: We need CORS only if we are querying the APIs from a different origin
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: 'https://www.desafioeletrobras60.fazgame.com.br',
    credentials: true,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()]
  })

  await superTokensNextWrapper(
    async next => {
      await middleware()(req, res, next)
    },
    req,
    res
  )
  if (!res.writableEnded) {
    res.status(404).send('Not found')
  }
}
