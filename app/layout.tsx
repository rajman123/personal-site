import type { Metadata } from 'next';
import { Instrument_Serif, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
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
  title: 'Rajveer Gehani — AI agents that run real workflows',
  description:
    'Rajveer Gehani builds AI agents that take repetitive work off founders\' plates. BC \'28, Finance + CS. Boston / Dubai.',
  openGraph: {
    title: 'Rajveer Gehani',
    description: 'AI agents that run real workflows.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      data-accent="amber"
    >
      <body className="font-sans antialiased grain">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
