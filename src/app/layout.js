import './globals.css';
import { Great_Vibes, Playfair_Display, Playfair_Display_SC, DM_Sans, Special_Elite } from 'next/font/google';
import GlobalFooter from '@/components/GlobalFooter';
import RomanticBackground from '@/components/RomanticBackground';

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-script' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-serif', weight: ['400', '600', '700'] });
const playfairDisplaySC = Playfair_Display_SC({ subsets: ['latin'], display: 'swap', variable: '--font-display', weight: ['400', '700'] });
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-body', weight: ['300', '400', '500', '600', '700'] });
const specialElite = Special_Elite({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-mono' });

export const metadata = {
  title: 'Bloomshire — Beautiful Flowers Delivered Digitally',
  description: 'Beautiful digital flower bouquets with love.',
  keywords: 'digital bouquet, flowers, send flowers online, virtual flowers, digital gift',
  metadataBase: new URL('https://digital-bouquet-henna.vercel.app'),
  openGraph: {
    title: 'Bloomshire — Beautiful Flowers Delivered Digitally',
    description: 'Beautiful digital flower bouquets with love.',
    type: 'website',
    siteName: 'Bloomshire',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloomshire — Beautiful Flowers Delivered Digitally',
    description: 'Beautiful digital flower bouquets with love.',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${playfairDisplay.variable} ${playfairDisplaySC.variable} ${dmSans.variable} ${specialElite.variable}`}>
      <body className="font-body text-charcoal antialiased" style={{ background: 'transparent' }}>
        <RomanticBackground />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
