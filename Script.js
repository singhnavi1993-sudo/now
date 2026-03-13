const container = document.getElementById("gamesContainer");
const topContainer = document.getElementById("topGamesContainer");
const popularContainer = document.getElementById("popularGamesContainer");
const moreContainer = document.getElementById("moreGamesContainer");

fetch("games.json")
    .then(response => response.json())
    .then(games => {

        // -------- HOT GAMES (first 8) --------
        const hotGames = games.slice(0, 8);

        hotGames.forEach(game => {

            const card = document.createElement("div");
            card.className = "game-card";

            card.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.title}">
            </div>
        `;

            card.onclick = () => {
                window.location.href = game.link;
            };

            container.appendChild(card);
        });


        // -------- TOP GAMES (next 16) --------
        const topGames = games.slice(8, 24);

        topGames.forEach(game => {

            const card = document.createElement("div");
            card.className = "top-game-card";

            card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="top-game-title">${game.title}</div>
        `;

            card.onclick = () => {
                window.location.href = game.link;
            };

            topContainer.appendChild(card);
        });


        // -------- POPULAR GAMES (next 5) --------
        const popularGames = games.slice(24, 30);

        popularGames.forEach(game => {

            const card = document.createElement("div");
            card.className = "popular-game-card";

            card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="popular-game-title">${game.title}</div>
        `;

            card.onclick = () => {
                window.location.href = game.link;
            };

            popularContainer.appendChild(card);
        });


        // -------- MORE GAMES (next 16) --------
        const moreGames = games.slice(30, 45);

        moreGames.forEach(game => {

            const card = document.createElement("div");
            card.className = "more-game-card";

            card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="more-game-title">${game.title}</div>
        `;

            card.onclick = () => {
                window.location.href = game.link;
            };

            moreContainer.appendChild(card);
        });

    });