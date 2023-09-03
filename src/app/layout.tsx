import './globals.css'
import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { ApolloProvider } from "@apollo/client";
import keyProvider from "../context/key"
import client from "../utils/api/graphql/index";
import { ApolloWrapper } from '../utils/api/graphql/index';

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
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
