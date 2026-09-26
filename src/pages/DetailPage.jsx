import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import {
  capitalize,
  formatPokemonId,
  getTypeColor,
} from "../utils.js";
import TypeBadge from "../components/TypeBadge.jsx";
import StatBar from "../components/StatBar.jsx";
import AbilityList from "../components/AbilityList.jsx";
import MoveList from "../components/MoveList.jsx";
import EvolutionChain from "../components/EvolutionChain.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import { DetailSkeleton } from "../components/LoadingSkeleton.jsx";
import EmptyState from "../components/EmptyState.jsx";

function DetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);
      setPokemon(null);
      setSpecies(null);

      try {
        const cleanQuery = String(name).trim().toLowerCase();
        const response = await fetch(`${API_BASE_URL}/pokemon/${cleanQuery}`);

        if (!response.ok) {
          throw new Error(
            `No Pokémon named "${name}" was found in the library. Check the spelling or ID.`
          );
        }

        const data = await response.json();

        // Also fetch species data for genus ("The Mouse Pokémon"), capture rate, growth rate
        let speciesData = null;
        if (data.species?.url) {
          try {
            const specRes = await fetch(data.species.url);
            if (specRes.ok) {
              speciesData = await specRes.json();
            }
          } catch {
            // Optional species fetch failure shouldn't block the main page
          }
        }

        if (isCurrent) {
          setPokemon(data);
          setSpecies(speciesData);
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isCurrent = false;
    };
  }, [name]);

  // Dynamic Browser Tab Title side-effect
  useEffect(() => {
    if (pokemon) {
      document.title = `${capitalize(pokemon.name)} (${formatPokemonId(
        pokemon.id
      )}) | Pokémon Library`;
    } else {
      document.title = "Pokémon Library";
    }

    return () => {
      document.title = "Pokémon Library";
    };
  }, [pokemon]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !pokemon) {
    return (
      <EmptyState
        title="Pokémon Not Found"
        message={error || "Could not retrieve Pokémon data."}
        actionText="Back to Library"
        actionTo="/"
      />
    );
  }

  // Extract relevant properties
  const artwork =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const primaryColor = getTypeColor(primaryType);

  const genus =
    species?.genera?.find((g) => g.language.name === "en")?.genus ||
    "Pokémon Species";

  const flavorText =
    species?.flavor_text_entries?.find((f) => f.language.name === "en")
      ?.flavor_text?.replace(/[\f\n\r\t]/g, " ") || null;

  // Total Base Stats Calculation
  const totalBaseStats = pokemon.stats?.reduce(
    (acc, curr) => acc + curr.base_stat,
    0
  );

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id + 1;

  return (
    <div className="detail-view-container">
      {/* Top Action Bar */}
      <div className="detail-nav-bar">
        <Link to="/" className="back-link">
          <span className="back-arrow">←</span> Back to Library
        </Link>
        <FavoriteButton pokemon={pokemon} className="detail-fav-btn" />
      </div>

      {/* Main Pokémon Hero Card */}
      <div
        className="detail-hero-card"
        style={{
          "--primary-glow": primaryColor,
        }}
      >
        <div className="hero-header-row">
          <div>
            <span className="detail-number-badge">
              {formatPokemonId(pokemon.id)}
            </span>
            <h1 className="detail-pokemon-name">{capitalize(pokemon.name)}</h1>
            <p className="detail-pokemon-genus">{genus}</p>
          </div>

          <div className="detail-types-row">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} size="lg" />
            ))}
          </div>
        </div>

        {/* Artwork Showcase */}
        <div className="detail-artwork-wrap">
          <div className="artwork-halo" />
          <img
            src={artwork}
            alt={pokemon.name}
            className="detail-main-artwork"
          />
        </div>

        {/* Pokedex Entry Description */}
        {flavorText && (
          <div className="detail-pokedex-entry">
            <p className="entry-quote">“{flavorText}”</p>
          </div>
        )}

        {/* Physical & Training Metrics Bar */}
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-label">Height</span>
            <span className="metric-value">
              {(pokemon.height / 10).toFixed(1)} m
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Weight</span>
            <span className="metric-value">
              {(pokemon.weight / 10).toFixed(1)} kg
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Base XP</span>
            <span className="metric-value">
              {pokemon.base_experience ?? "—"} XP
            </span>
          </div>

          {species?.capture_rate !== undefined && (
            <div className="metric-box">
              <span className="metric-label">Catch Rate</span>
              <span className="metric-value">{species.capture_rate}</span>
            </div>
          )}

          {species?.growth_rate?.name && (
            <div className="metric-box">
              <span className="metric-label">Growth Rate</span>
              <span className="metric-value capitalize">
                {species.growth_rate.name.replace("-", " ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Base Stats Section */}
      <section className="detail-section base-stats-section">
        <div className="section-header-flex">
          <h2 className="section-title">Base Statistics</h2>
          <span className="total-stats-badge">Total: {totalBaseStats}</span>
        </div>

        <div className="stats-list-container">
          {pokemon.stats.map((s) => (
            <StatBar
              key={s.stat.name}
              name={s.stat.name}
              value={s.base_stat}
              max={255}
            />
          ))}
        </div>
      </section>

      {/* Abilities Section */}
      <AbilityList abilities={pokemon.abilities} />

      {/* Evolution Chain Section */}
      <EvolutionChain
        speciesUrl={pokemon.species?.url}
        currentName={pokemon.name}
      />

      {/* Moves Section */}
      <MoveList moves={pokemon.moves} />

      {/* Previous / Next Navigation Footer */}
      <div className="detail-footer-pagination">
        {prevId ? (
          <button
            type="button"
            className="pagination-btn prev-btn"
            onClick={() => navigate(`/pokemon/${prevId}`)}
          >
            <span className="pag-arrow">←</span>
            <div className="pag-text">
              <span className="pag-subtitle">Previous</span>
              <span className="pag-title">{formatPokemonId(prevId)}</span>
            </div>
          </button>
        ) : (
          <div className="pag-placeholder" />
        )}

        <button
          type="button"
          className="pagination-btn next-btn"
          onClick={() => navigate(`/pokemon/${nextId}`)}
        >
          <div className="pag-text">
            <span className="pag-subtitle">Next</span>
            <span className="pag-title">{formatPokemonId(nextId)}</span>
          </div>
          <span className="pag-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
