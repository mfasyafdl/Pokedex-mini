import { Link } from "react-router-dom";
import { capitalize, formatPokemonId, getArtworkUrl, getSpriteUrl } from "../utils.js";
import TypeBadge from "./TypeBadge.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

function PokemonCard({ pokemon, id }) {
  const pokemonId = id || pokemon.id;
  const name = pokemon.name;
  const artwork = pokemon.artwork || getArtworkUrl(pokemonId);
  const sprite = pokemon.sprite || getSpriteUrl(pokemonId);

  return (
    <div className="pokemon-card">
      <div className="card-top-bar">
        <span className="pokemon-card-id">{formatPokemonId(pokemonId)}</span>
        <FavoriteButton pokemon={{ id: pokemonId, name, types: pokemon.types }} className="card-fav-btn" />
      </div>

      <Link to={`/pokemon/${name}`} className="pokemon-card-link">
        <div className="pokemon-card-image-wrap">
          <img
            src={artwork}
            alt={name}
            loading="lazy"
            className="pokemon-card-artwork"
            onError={(e) => {
              // Fallback to sprite if high-res artwork isn't found
              if (e.target.src !== sprite) {
                e.target.src = sprite;
              }
            }}
          />
        </div>

        <h3 className="pokemon-card-name">{capitalize(name)}</h3>

        {pokemon.types && pokemon.types.length > 0 ? (
          <div className="pokemon-card-types">
            {pokemon.types.map((typeObj) => {
              const typeName = typeof typeObj === "string" ? typeObj : typeObj.type?.name;
              return <TypeBadge key={typeName} type={typeName} size="sm" />;
            })}
          </div>
        ) : (
          <div className="pokemon-card-action">
            <span>View Details</span>
            <span className="action-arrow">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        )}
      </Link>
    </div>
  );
}

export default PokemonCard;
