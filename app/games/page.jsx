import GamesPage from '../../src/GamesPage';

export const metadata = {
  title: 'Games - Play Online in Browser | now-gg.com',
  description: 'Browse and play popular online games instantly on now-gg.com/games/. No downloads, no installation, direct browser gameplay.',
  alternates: {
    canonical: 'https://now-gg.com/games/',
  },
  openGraph: {
    title: 'Games - Play Online in Browser | now-gg.com',
    description: 'Browse and play popular online games instantly on now-gg.com/games/. No downloads, no installation, direct browser gameplay.',
    url: 'https://now-gg.com/games/',
    siteName: 'now-gg.com',
  },
};

export default function GamesIndex() {
  return <GamesPage pathGameSlug="" pathCategorySlug="" />;
}
