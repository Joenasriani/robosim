import type { Metadata } from 'next';
import './globals.css';

const canonicalUrl = 'https://joenasr.itch.io/robosim';
const personId = 'https://joe-nasr-signals.vercel.app/v2/#joe-nasr';

export const metadata: Metadata = {
  title: 'RoboSim | Joe Nasr',
  description:
    'RoboSim is Joe Nasr’s browser-based educational robot simulation game for programming logic, sequencing, debugging and simulated robot navigation.',
  authors: [{ name: 'Joe Nasr', url: 'https://joe-nasr-signals.vercel.app/v2/' }],
  creator: 'Joe Nasr',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: 'website',
    title: 'RoboSim | Joe Nasr',
    description:
      'Browser-based robot simulation game for programming logic, sequencing, debugging and simulated navigation.',
    url: canonicalUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoboSim | Joe Nasr',
    description:
      'Browser-based robot simulation game for programming logic, sequencing, debugging and simulated navigation.',
  },
};

const gameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  '@id': `${canonicalUrl}#game`,
  name: 'RoboSim',
  url: canonicalUrl,
  description:
    'RoboSim is a browser-based educational robot simulation game for programming logic, sequencing, debugging and simulated robot navigation.',
  genre: ['Educational', 'Simulation'],
  gamePlatform: 'Web browser',
  inLanguage: 'en',
  creator: {
    '@type': 'Person',
    '@id': personId,
    name: 'Joe Nasr',
    alternateName: ['Joe Ribal Nasr', 'Joseph Ribal Nasr'],
    url: 'https://joe-nasr-signals.vercel.app/v2/',
  },
  sameAs: ['https://github.com/Joenasriani/robosim'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
