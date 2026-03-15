const container = document.getElementById("gamesContainer");
const topContainer = document.getElementById("topGamesContainer");
const popularContainer = document.getElementById("popularGamesContainer");
const moreContainer = document.getElementById("moreGamesContainer");

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// UPDATED: Now all games go to your internal URL structure first
function handleGameClick(game) {
    const finalSlug = game.slug || slugify(game.title);
    window.location.href = `/games/free-online-game/${finalSlug}`;
}

fetch("/games.json")
    .then(response => {
        if (!response.ok) throw new Error("Could not load games.json");
        return response.json();
    })
    .then(games => {
        // HOT GAMES
        games.slice(0, 8).forEach(game => {
            const card = document.createElement("div");
            card.className = "game-card";
            card.innerHTML = `<div class="game-image"><img src="${game.image}" alt="${game.title}"></div>`;
            card.onclick = () => handleGameClick(game);
            container.appendChild(card);
        });

        // TOP GAMES
        games.slice(8, 24).forEach(game => {
            const card = document.createElement("div");
            card.className = "top-game-card";
            card.innerHTML = `<img src="${game.image}" alt="${game.title}"><div class="top-game-title">${game.title}</div>`;
            card.onclick = () => handleGameClick(game);
            topContainer.appendChild(card);
        });

        // POPULAR GAMES
        games.slice(24, 30).forEach(game => {
            const card = document.createElement("div");
            card.className = "popular-game-card";
            card.innerHTML = `<img src="${game.image}" alt="${game.title}"><div class="popular-game-title">${game.title}</div>`;
            card.onclick = () => handleGameClick(game);
            popularContainer.appendChild(card);
        });

        // MORE GAMES
        games.slice(30, 45).forEach(game => {
            const card = document.createElement("div");
            card.className = "more-game-card";
            card.innerHTML = `<img src="${game.image}" alt="${game.title}"><div class="more-game-title">${game.title}</div>`;
            card.onclick = () => handleGameClick(game);
            moreContainer.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading games:", error));
