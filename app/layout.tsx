import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SoundSphere - The Future of Music Streaming',
  description: 'Experience music like never before with AI-powered recommendations, curated playlists, and immersive audio experiences. Join the next generation of music streaming.',
  keywords: ['music streaming', 'AI music', 'playlists', 'audio', 'SoundSphere'],
  authors: [{ name: 'SoundSphere Team' }],
  openGraph: {
    title: 'SoundSphere - The Future of Music Streaming',
    description: 'Experience music like never before with AI-powered recommendations and curated playlists.',
    url: 'https://soundsphere.app',
    siteName: 'SoundSphere',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoundSphere - The Future of Music Streaming',
    description: 'Experience music like never before with AI-powered recommendations and curated playlists.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}