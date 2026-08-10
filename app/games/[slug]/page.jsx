import GamesPage from '../../../src/GamesPage';
import { gamesData, gameSlug } from '../../../src/gamesData';
import gameSeoContent from '../../../src/gameSeoContent.json';

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  return gamesData.map((game) => ({
    slug: `${gameSlug(game)}.html`,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const pureSlug = resolvedParams.slug.replace(/\.html$/, '');
  const game = gamesData.find((g) => gameSlug(g) === pureSlug) || gamesData[0];
  const content = gameSeoContent[pureSlug] || {};

  const title = content.metaTitle || `${game.title} - Play Free Online | now-gg`;
  const description = content.metaDescription || `Play ${game.title} online free on now-gg with no download required.`;
  const canonical = `https://now-gg.com/games/${pureSlug}.html`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'now-gg.com',
      images: [game.thumbnail],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [game.thumbnail],
    },
  };
}

export default async function GamePage({ params }) {
  const resolvedParams = await params;
  const pureSlug = resolvedParams.slug.replace(/\.html$/, '');
  return <GamesPage pathGameSlug={pureSlug} pathCategorySlug="" />;
}
