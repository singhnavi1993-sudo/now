import React from 'react';

function StarIcon() {
  return (
    <svg className="game-card__star-ico" viewBox="0 0 12 12" width="12" height="12" aria-hidden>
      <path
        fill="currentColor"
        d="M6 0l1.47 3.55L11 4.2 8.5 6.8 9.18 11 6 9.05 2.82 11l.68-4.2L1 4.2l3.53-.65L6 0z"
      />
    </svg>
  );
}

function GameOrb({ game }) {
  return (
    <article className="game-orb">
      <div className="game-orb__ring">
        <img src={game.thumbnail} alt={game.title} loading="lazy" />
      </div>
    </article>
  );
}

function GameTopSquare({ game, featured = false, hoverRated = false }) {
  const rating = game.rating != null ? Number(game.rating).toFixed(1) : '4.7';

  return (
    <article
      className={`game-tile-square ${featured ? 'game-tile-square--featured' : ''} ${hoverRated ? 'game-tile-square--hover-rated' : ''}`}
    >
      <div className="game-tile-square__media">
        <img src={game.thumbnail} alt="" loading="lazy" />

        {hoverRated ? (
          <div className="game-tile-square__rating-float">
            <span className="game-tile-square__rating-pill">
              <StarIcon />
              <span className="game-tile-square__rating-num">{rating}</span>
            </span>
          </div>
        ) : null}

        {featured ? (
          <span className="game-tile-square__fire" title="Hot" aria-hidden>
            ??
          </span>
        ) : null}

        <div className="game-tile-square__overlay">
          <span className="game-tile-square__play" aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
      <h3 className="game-tile-square__title">{game.title}</h3>
    </article>
  );
}

function GameCard({ game, variant = 'default', compact = false, showHot = false, featured = false, hoverRated = false }) {
  if (variant === 'orb') {
    return <GameOrb game={game} />;
  }

  if (variant === 'topSquare') {
    return <GameTopSquare game={game} featured={featured} hoverRated={hoverRated} />;
  }

  const rating = game.rating != null ? Number(game.rating).toFixed(1) : '4.5';

  return (
    <article className={`game-card ${compact ? 'game-card--compact' : ''}`}>
      <div className="game-card__media">
        <img src={game.thumbnail} alt={game.title} loading="lazy" />
        {showHot ? <span className="game-card__hot">Hot</span> : null}
        <div className="game-card__rating-float">
          <span className="game-card__rating-pill">
            <StarIcon />
            <span className="game-card__rating-num">{rating}</span>
          </span>
        </div>
        <div className="game-card__overlay">
          <span className="game-card__play" aria-hidden>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="game-card__meta">
        <h3 className="game-card__title">{game.title}</h3>
      </div>
    </article>
  );
}

export default GameCard;
