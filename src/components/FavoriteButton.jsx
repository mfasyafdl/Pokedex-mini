import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "../utils.js";

function FavoriteButton({ pokemon, className = "" }) {
  const [favorite, setFavorite] = useState(() =>
    pokemon ? isFavorite(pokemon.id || pokemon.name) : false
  );

  useEffect(() => {

    function handleSync() {
      if (pokemon) {
        setFavorite(isFavorite(pokemon.id || pokemon.name));
      }
    }

    window.addEventListener("favorites-updated", handleSync);
    return () => window.removeEventListener("favorites-updated", handleSync);
  }, [pokemon]);

  function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!pokemon) return;
    const newState = toggleFavorite(pokemon);
    setFavorite(newState);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`favorite-btn ${favorite ? "is-favorite" : ""} ${className}`}
      title={favorite ? "Remove from Favorites" : "Add to Favorites"}
      aria-label={favorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill={favorite ? "#ef4444" : "none"}
        stroke={favorite ? "#ef4444" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="favorite-btn-text">
        {favorite ? "Favorited" : "Favorite"}
      </span>
    </button>
  );
}

export default FavoriteButton;
