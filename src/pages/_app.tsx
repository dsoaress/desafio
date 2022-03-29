import '../styles/globals.css'

import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import { Layout } from '../components/Layout'

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
