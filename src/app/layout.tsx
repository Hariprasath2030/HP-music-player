import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HP Music Player',
  description: 'Your personal music streaming platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}