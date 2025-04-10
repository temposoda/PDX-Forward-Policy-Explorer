import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion'
export const metadata: Metadata = {
  title: 'PDX Forward Policy Explorer',
  description: 'Explore and filter proposed policies by policy area, expected cost, and budget impact.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AnimatePresence>

          <main className="max-w-7xl mx-auto p-4">
            <Suspense fallback={<div>loading...</div>}>
              {children}
            </Suspense>
          </main>
        </AnimatePresence>


      </body>
    </html>
  )
}