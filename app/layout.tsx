import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDX Forward Policy Explorer',
  description: 'Explore and filter proposed policies by policy area, expected cost, and budget impact.',
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main className="max-w-7xl mx-auto p-4">
          {children}
          {modal}
        </main>
      </body>
    </html>
  )
}