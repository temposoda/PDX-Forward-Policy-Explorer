import './globals.css'
import type { Metadata, Viewport } from 'next'
import AnimationProvider from './providers/AnimationProvider';

export const metadata: Metadata = {
  title: 'PDX Forward Policy Explorer',
  description: 'Explore and filter proposed policies by policy area, expected cost, and budget impact.',

}

export const viewport: Viewport = {
  'width': 'device-width', initialScale: 1
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AnimationProvider>
          <main className="max-w-7xl mx-auto px-3 py-4 sm:p-4 md:p-6">
            {children}
          </main>
        </AnimationProvider>
      </body>
    </html>
  );
}