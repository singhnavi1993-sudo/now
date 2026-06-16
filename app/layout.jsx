import '../src/index.css';
import '../src/App.css'; // Global App styles

export const metadata = {
  title: 'Play Online Games for Free | now-gg.com',
  description: 'Play online games instantly on now-gg.com. Explore top games, popular picks, categories, and browser play without downloads.',
  robots: 'index,follow,max-image-preview:large',
  alternates: {
    canonical: 'https://now-gg.com/',
  },
  openGraph: {
    title: 'Play Online Games for Free | now-gg.com',
    description: 'Play online games instantly on now-gg.com. Browse top games and start playing in your browser.',
    url: 'https://now-gg.com/',
    siteName: 'now-gg.com',
    images: [
      {
        url: 'https://now-gg.com/nowgg-bg.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play Online Games for Free | now-gg.com',
    description: 'Play online games instantly on now-gg.com. Browse top games and start playing in your browser.',
    images: ['https://now-gg.com/nowgg-bg.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF42A5',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "now-gg.com",
    "url": "https://now-gg.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://now-gg.com/games/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
