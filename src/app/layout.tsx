'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import client from "../utils/api/graphql"
import { ApolloProvider } from "@apollo/client";
import KeyProvider from "../context/key";
const inter = Inter_Tight({ subsets: ['latin'] })

const metadata: Metadata = {
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
        <ApolloProvider  client={client({ pkey: "clh9l6w9l000008mobug48zm6" })}><KeyProvider pkey={{ value: "clh9l6w9l000008mobug48zm6" }}> {children}</KeyProvider></ApolloProvider>
       
        </body>
    </html>
  )
}
