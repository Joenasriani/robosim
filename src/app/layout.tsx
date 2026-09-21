import type { Metadata } from 'next';
import './globals.css';

const canonicalUrl = 'https://joenasr.itch.io/robosim';
const personId = 'https://joe-nasr-signals.vercel.app/#joe-nasr';

export const metadata: Metadata = {
  title: 'RoboSim | Robot Programming Simulation Game',
  description:
    'Browser-based educational robot simulation game for programming logic, sequencing, debugging and simulated robot navigation.',
  authors: [{ name: 'Joe Nasr', url: 'https://joe-nasr-signals.vercel.app/' }],
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
    title: 'RoboSim | Robot Programming Simulation Game',
    description:
      'Program, sequence, debug and simulate robot navigation in a browser-based educational game.',
    url: canonicalUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoboSim | Robot Programming Simulation Game',
    description:
      'Program, sequence, debug and simulate robot navigation in a browser-based educational game.',
  },
};

const gameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  '@id': `${canonicalUrl}#game`,
  name: 'RoboSim',
  url: canonicalUrl,
  description:
    'Browser-based educational robot simulation game for programming logic, sequencing, debugging and simulated robot navigation.',
  genre: ['Educational', 'Simulation'],
  gamePlatform: 'Web browser',
  inLanguage: 'en',
  creator: {
    '@type': 'Person',
    '@id': personId,
    name: 'Joe Nasr',
    alternateName: ['Joe Ribal Nasr', 'Joseph Ribal Nasr'],
    url: 'https://joe-nasr-signals.vercel.app/',
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