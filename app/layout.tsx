import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from './api/uploadthing/core'

const inter = localFont({
  src: './fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter',
  weight: '100 200 300 400 500 600 700 800 900',
})
const sourcepro = localFont({
  src: './fonts/SourceCodePro-VariableFont_wght.ttf',
  variable: '--font-sourcepro',
  weight: '100 200 300 400 500 600 700 800 900',
})

export const metadata: Metadata = {
  title: 'Velvet store',
  description: 'Shop where you can relax',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      <body className={`${inter.variable} ${sourcepro.variable} antialiased`}>{children}</body>
    </html>
  )
}
