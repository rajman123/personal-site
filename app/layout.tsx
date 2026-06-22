import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { TopBar } from '@/components/TopBar';
import { CommandPalette } from '@/components/CommandPalette';

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rajveer Gehani — Finance + CS · AI systems for real clients',
  description:
    'Rajveer Gehani — Boston College, Finance + CS. I build and deploy AI systems for real clients. Boston / Dubai.',
  openGraph: {
    title: 'Rajveer Gehani',
    description: 'Finance + CS. I build and deploy AI systems for real clients.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <TopBar />
        <main>{children}</main>
        <CommandPalette />
      </body>
    </html>
  );
}
