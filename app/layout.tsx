import './globals.css'
import type { Metadata, Viewport } from 'next'
import AnimationProvider from './providers/AnimationProvider';
import { Inter } from 'next/font/google';
import { Provider } from "@/app/components/ui/provider"

// Load Inter font with specific subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PDX Forward Policy Explorer',
  description: 'Explore and filter proposed policies by policy area, expected cost, and budget impact.',
}

export const viewport: Viewport = {
  'width': 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.variable}>
      <body className="bg-gray-50 font-sans">
        <Provider>
          <AnimationProvider>
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 md:px-8 md:py-8">
              {children}
            </main>
          </AnimationProvider>
        </Provider>
      </body>
    </html>
  );
}