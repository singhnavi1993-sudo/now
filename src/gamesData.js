/** Browse labels aligned with now.gg “Explore by Categories” */
export const browseCategories = [
  'Free Browser Games',
  'Casual Games',
  'Strategy Games',
  'Simulation Games',
  'Role Playing Games',
  'Action Games',
  'Adventure Games',
  'Puzzle Games',
  'Arcade Games',
  'Sports Games',
  'Casino Games',
  'Racing Games',
  'Card Games',
  'Educational Games',
  'Social Games',
];

/** Used for per-genre rows on the home page (only genres you have games for) */
export const categories = [
  'Trending',
  'Action',
  'Simulation',
  'Strategy',
  'Casual',
  'Adventure',
];

export const gamesData = [
    // 🔥 TRENDING
    {
        id: 1,
        title: 'Five Nights at Freddy\'s',
        category: ['Trending', 'Action'],
        slug: 'FNAF',
        thumbnail: 'https://fnaffree.io/cache/data/image/game/fnaf-free/fnaf-free-m200x200.webp',
        link: 'https://fnaffree.io/',
        rating: 4.44
    },
    {
        id: 2,
        title: 'Shell Shockers',
        category: ['Trending', 'Action'],
        slug: 'shell-shockers',
        thumbnail: 'https://imgs.crazygames.com/shellshockersio_16x9/20260203211252/shellshockersio_16x9-cover?metadata=none&quality=60&height=6999',
        link: 'https://shellshock.io',
        rating: 4.6
    },
    {
        id: 3,
        title: 'Slither',
        category: ['Trending', 'Casual'],
        slug: 'slither',
        thumbnail: 'https://slither.io/s/favicon.png',
        link: 'https://slither.io',
        rating: 4.5
    },
    {
        id: 4,
        title: 'Gacha Life 2',
        category: ['Trending', 'Casual'],
        slug: 'gacha-life-2',
        thumbnail: 'https://gachalife2.com/assets/images/image01.png?v=6359d8db',
        link: 'https://gacha-life.io/gacha-life-2.embed',
        rating: 4.35
    },
    {
        id: 5,
        title: 'Gacha Life ',
        category: ['Trending', 'Casual'],
        slug: 'gacha-life-',
        thumbnail: 'https://gacha-life.io/data/image/game/gacha-life-game.png',
        link: 'https://gacha-life.io/gacha-life.embed',
        rating: 4.5
    },
    {
        id: 6,
        title: 'Hazmob FPS ',
        category: ['Trending', 'Action'],
        slug: 'hazmob-fps',
        thumbnail: 'https://static.playhop.com/images/c304d_6238841_6cfa5/739c004dd/2a00000194fe8869_f632299/39daa780f79acdd4a550_8ce155/pjpg160x160',
        link: 'https://s3.gamepush.com/games-ss/71/?sdk=https%3A%2F%2Fgames.s3.yandex.net%2Fsdk%2F_%2Fv2.c9dd7fdd48522a0f7d44.js&sdk_origin=sdk.games.s3.yandex.net',
        rating: 4.5
    },

    // ⚔️ ACTION
    {
        id: 7,
        title: 'Bloxd',
        category: ['Trending', 'Browser'],
        slug: 'bloxd',
        thumbnail: 'https://cdn.now.gg/assets-opt/_next/image?url=https%3A%2F%2Fcdn.now.gg%2Fassets-opt%2F_next%2Fimage%3Furl%3Dhttps%253A%252F%252Fcdn.now.gg%252Fapps-content%252Fcom.nowgg.h5.pub511.app51240%252Ficon%252Fbloxd-io.png%26w%3D256%26q%3D80&w=1440&q=70',
        link: 'https://bloxd.io/',
        rating: 4.5
    },
    {
        id: 8,
        title: 'ZombsRoyale',
        category: ['Action', 'Strategy'],
        slug: 'zombsroyale',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/ZombsRoyale.io_Cover_Art.jpg/250px-ZombsRoyale.io_Cover_Art.jpg',
        link: 'https://zombsroyale.io',
        rating: 4.43
    },
    {
        id: 9,
        title: 'Drift Boss',
        category: ['Action'],
        slug: 'drift-boss',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJEaT1608eW4Vle-z6stx-2HiIG_CDAs7w8A&s',
        link: 'https://driftboss.io/',
        rating: 4.3
    },

    // 🧠 STRATEGY
    {
        id: 10,
        title: 'Chess',
        category: ['Strategy', 'Puzzle'],
        slug: 'chess',
        thumbnail: 'https://assets-configurator.chess.com/image/configurator/puzzles_1765899040725.webp',
        link: 'https://www.democraticchess.com/main?gad_source=1&gad_campaignid=23735402155&gbraid=0AAAABB4FfoRPLqNDklcPXHFEGK0YHaGWh&gclid=CjwKCAjwwdbPBhBgEiwAxBRA4cMvEz3x3qVX687jbXWR75QrHSOIeP13iUP-a4L5qLR5PEgrI2dkPRoCwxYQAvD_BwE',
        rating: 4.9
    },
    {
        id: 11,
        title: 'Ludo King',
        category: ['Strategy', 'Casual'],
        slug: 'ludo-king',
        thumbnail: 'https://ludoking.com/assets/images/ludoking-img.webp',
        link: 'https://ludoking.com/',
        rating: 4.6
    },

    // 🧩 PUZZLE
    {
        id: 12,
        title: 'Sudoku',
        category: ['Puzzle', 'Casual'],
        slug: 'sudoku',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1VhkUvVh1iVPW02lZgHEeePMsYKATJBepTF0zIDsozqCN1qaesPalozE&s',
        link: 'https://sudoku.com',
        rating: 4.4
    },
    {
        id: 13,
        title: 'Tetris',
        category: ['Puzzle', 'Arcade'],
        slug: 'tetris',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2B5enMOHdbS7md5j-8UcZ7FRNxn99mq8L1ivV3mJOzybchX2rjVGGU8fj-OQA_Ymc3enDMtDngXRbYcWmm2fmCQ_SSEy5MlLT38uniqh2Eg&s=10',
        link: 'https://tetris.com/play-tetris',
        rating: 4.7
    },

    // 🎮 CASUAL
    {
        id: 14,
        title: 'Gacha Club',
        category: ['Casual', 'Simulation'],
        slug: 'gacha-club',
        thumbnail: 'https://gacha-life.io/data/image/game/gacha-club-game.png',
        link: 'https://gacha-life.io/gacha-club.embed',
        rating: 4.8
    },
    {
        id: 15,
        title: 'Gacha Life-Dress Up',
        category: ['Casual', 'Simulation'],
        slug: 'gacha-life-dress-up',
        thumbnail: 'https://gacha-life.io/data/image/game/gacha-life-dress-up.jpg',
        link: 'https://gacha-life.io/gacha-life-dress-up.embed',
        rating: 4.3
    },
    {
        id: 16,
        title: 'Gacha Life-Maker',
        category: ['Casual', 'Simulation'],
        slug: 'gacha-life-maker',
        thumbnail: 'https://gacha-life.io/data/image/game/gacha-life-maker.png',
        link: 'https://gacha-life.io/gacha-life-maker.embed',
        rating: 4.3
    },

    // 🚗 SIMULATION
    {
        id: 17,
        title: 'Slow Roads',
        category: ['Simulation', 'Casual'],
        slug: 'slow-roads',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY7gV7a_PRQrzo9UNvkjkQKtO47deTsKlZ0rZOKQ2Yean-xS66IObGGgdECGF6B8W--Yi7E8kYkyTbxR8OjF-Ux-LXgjnSaW5y1xaR6TvGbQ&s=10',
        link: 'https://slowroads.io',
        rating: 4.6
    },
    {
        id: 18,
        title: 'Drift Hunters',
        category: ['Simulation', 'Racing'],
        slug: 'drift-hunters',
        thumbnail: 'https://picsum.photos/300/400?random=15',
        link: 'https://www.crazygames.com/game/drift-hunters',
        rating: 4.5
    },

    // 🏃 ADVENTURE
    {
        id: 19,
        title: 'Run 3',
        category: ['Adventure', 'Casual'],
        slug: 'run3',
        thumbnail: 'https://run3.io/favicon.ico',
        link: 'https://run3.io',
        rating: 4.6
    },
    {
        id: 20,
        title: 'Subway Surfers (Web)',
        category: ['Adventure', 'Arcade'],
        slug: 'subway',
        thumbnail: 'https://subwaysurfersgame.io/favicon.ico',
        link: 'https://subwaysurfersgame.io',
        rating: 4.4
    },

    // 🏎️ RACING
    {
        id: 21,
        title: 'Moto X3M',
        category: ['Racing', 'Action'],
        slug: 'motox3m',
        thumbnail: 'https://moto-x3m.net/favicon.ico',
        link: 'https://moto-x3m.net',
        rating: 4.5
    },

    // 🎯 ARCADE
    {
        id: 22,
        title: 'Agar.io',
        category: ['Arcade', 'Action'],
        slug: 'agar',
        thumbnail: 'https://agar.io/favicon.ico',
        link: 'https://agar.io',
        rating: 4.3
    },
    {
        id: 23,
        title: 'Hole.io',
        category: ['Arcade', 'Casual'],
        slug: 'hole',
        thumbnail: 'https://hole-io.com/favicon.ico',
        link: 'https://hole-io.com',
        rating: 4.2
    }];

export function toSlug(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function gameSlug(game) {
  const preferred = toSlug(game?.slug);
  if (preferred) return preferred;
  return toSlug(game?.title);
}

export function gamePath(game) {
  return `/games/${gameSlug(game)}.html`;
}

export function categorySlug(name) {
  return toSlug(name);
}

export function categoryPath(name) {
  return `/games/category/${categorySlug(name)}.html`;
}
