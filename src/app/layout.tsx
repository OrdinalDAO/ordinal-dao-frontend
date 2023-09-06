'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
<<<<<<< HEAD
import { ApolloProvider } from "@apollo/client";
import keyProvider from "../context/key"
import client from "../utils/api/graphql/index";
import { ApolloWrapper } from '../utils/api/graphql/index';

=======
import client from "../utils/api/graphql"
import { ApolloProvider } from "@apollo/client";
import KeyProvider from "../context/key";
>>>>>>> e05a257617f7db7d4ea85dd60189bdffa907d78b
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
<<<<<<< HEAD
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
=======
        <ApolloProvider  client={client({ pkey: "clh9l6w9l000008mobug48zm6" })}><KeyProvider pkey={{ value: "clh9l6w9l000008mobug48zm6" }}> {children}</KeyProvider></ApolloProvider>
       
        </body>
>>>>>>> e05a257617f7db7d4ea85dd60189bdffa907d78b
    </html>
  )
}
