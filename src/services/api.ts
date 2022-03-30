import axios from 'axios'
import Session from 'supertokens-auth-react/recipe/session'

export const api = axios.create({
  baseURL: '/api'
})

Session.addAxiosInterceptors(api)
