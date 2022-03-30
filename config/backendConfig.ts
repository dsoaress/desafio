import EmailPasswordNode from 'supertokens-node/recipe/emailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import { TypeInput } from 'supertokens-node/types'

import { appInfo } from './appInfo'

export const backendConfig = (): TypeInput => {
  const { SP_CONNECTION_STRING, SP_API_KEY } = process.env

  if (!SP_CONNECTION_STRING || !SP_API_KEY) {
    throw new Error('Missing SP_CONNECTION_STRING or SP_API_KEY')
  }

  return {
    framework: 'express',
    supertokens: {
      connectionURI: SP_CONNECTION_STRING,
      apiKey: SP_API_KEY
    },
    appInfo,
    recipeList: [EmailPasswordNode.init(), SessionNode.init()],
    isInServerlessEnv: true
  }
}
