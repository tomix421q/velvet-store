import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

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
      <body className={`${inter.variable} ${sourcepro.variable} antialiased`}>{children}</body>
    </html>
  )
}
