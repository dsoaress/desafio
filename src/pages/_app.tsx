import '../styles/globals.css'

import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import SuperTokensReact from 'supertokens-auth-react'

import { frontendConfig } from '../../config/frontendConfig'
import { Layout } from '../components/Layout'

if (typeof window !== 'undefined') {
  SuperTokensReact.init(frontendConfig())
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
