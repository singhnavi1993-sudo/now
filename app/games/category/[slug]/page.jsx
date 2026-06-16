import GamesPage from '../../../../src/GamesPage';
import { browseCategories, categorySlug } from '../../../../src/gamesData';

export function generateStaticParams() {
  return browseCategories.map((name) => ({
    slug: `${categorySlug(name).replace(/-games$/, '')}.html`,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const pureSlug = resolvedParams.slug.replace(/\.html$/, '');
  const categoryName = browseCategories.find((name) => categorySlug(name).replace(/-games$/, '') === pureSlug) || 'Games';

  const title = `${categoryName} - Play Online in Browser | now-gg.com`;
  const description = `Browse and play popular ${categoryName} online instantly on now-gg.com.`;
  const canonical = `https://now-gg.com/games/category/${pureSlug}.html`;

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
    },
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const pureSlug = resolvedParams.slug.replace(/\.html$/, '');
  return <GamesPage pathGameSlug="" pathCategorySlug={pureSlug} />;
}
