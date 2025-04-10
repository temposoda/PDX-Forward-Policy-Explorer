import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react';

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
        <main className="max-w-7xl mx-auto p-4">
          <Suspense fallback={<div>loading...</div>}>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  )
}