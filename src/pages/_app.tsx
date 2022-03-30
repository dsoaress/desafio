import '../styles/globals.css'

import { AppProps } from 'next/app'
import Script from 'next/script'
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-673SLN2Q22"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-673SLN2Q22');
        `}
      </Script>

      <Toaster toastOptions={{ duration: 4000 }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
