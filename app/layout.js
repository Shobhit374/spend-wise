"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from "@/components/Nav"
import FinanceContextProvider from '@/lib/store/finance-context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinanceContextProvider><Nav/>{children}</FinanceContextProvider>
        </body>
    </html>
  )
}
