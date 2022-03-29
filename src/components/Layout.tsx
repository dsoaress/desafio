import Head from 'next/head'
import { ReactNode } from 'react'

import { seo } from '../../_data/seo'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <div
        className="absolute inset-0 bg-repeat -z-20"
        style={{ backgroundImage: `url('/assets/images/bg_pattern.jpg')` }}
      />

      <div
        className="absolute inset-0 -z-10 mix-blend-overlay"
        style={{ backgroundImage: 'linear-gradient(to bottom, #0079c1, #009e49, #c9da2a)' }}
      />

      <div className="fixed inset-0 overflow-y-auto bg-center p-4 md:p-8">
        <main className="p-6 md:p-8 lg:p-10 rounded-3xl max-w-screen-lg mx-auto bg-white">
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    </>
  )
}
