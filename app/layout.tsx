import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ColorModeProvider } from '@/app/components/ui/ColorModeProvider';
import { Container } from '@mui/material';

// Load Inter font with specific subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PDX Forward Policy Explorer',
  description: 'Explore and filter proposed policies by policy area, expected cost, and budget impact.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.variable}>
      <body>
        <ColorModeProvider>
          <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }}>
            {children}
          </Container>
        </ColorModeProvider>
      </body>
    </html>
  );
}