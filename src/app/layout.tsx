import './globals.css'
import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'

const inter = Inter_Tight({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OrdinalDAO',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
