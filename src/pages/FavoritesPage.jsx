import { useState, useEffect } from "react";
import { getFavorites } from "../utils.js";
import PokemonCard from "../components/PokemonCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    document.title = "Favorites | Pokémon Library";
    function load() {
      setFavorites(getFavorites());
    }
    load();

    window.addEventListener("favorites-updated", load);
    return () => window.removeEventListener("favorites-updated", load);
  }, []);

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1 className="page-title">Favorite Pokémon</h1>
        <p className="page-subtitle">
          Your personally saved Pokémon collection, stored locally in your browser.
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No Favorites Yet"
          message="Start exploring the Pokémon Library and click the heart icon on any Pokémon to save your favorites here."
          actionText="Explore Pokémon"
          actionTo="/"
        />
      ) : (
        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon.id || pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
