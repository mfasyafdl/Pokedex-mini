import { useState, useEffect, useMemo } from "react";
import { API_BASE_URL, PAGE_SIZE } from "../config.js";
import { getIdFromUrl, ALL_TYPES } from "../utils.js";
import PokemonCard from "./PokemonCard.jsx";
import { GridSkeleton } from "./LoadingSkeleton.jsx";
import EmptyState from "./EmptyState.jsx";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Filters & Sorting
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("number-asc");

  // Load initial batch or next batch
  useEffect(() => {
    let isCurrent = true;

    async function fetchBatch() {
      if (offset === 0) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
        );

        if (!response.ok) {
          throw new Error(`Failed to load Pokémon list (${response.status})`);
        }

        const data = await response.json();

        if (data.results.length < PAGE_SIZE) {
          setHasMore(false);
        }

        // Fetch basic details (types) in parallel for the newly loaded batch
        const enrichedList = await Promise.all(
          data.results.map(async (item) => {
            const id = getIdFromUrl(item.url);
            try {
              const detailRes = await fetch(item.url);
              if (detailRes.ok) {
                const detailData = await detailRes.json();
                return {
                  id: Number(id),
                  name: item.name,
                  url: item.url,
                  types: detailData.types?.map((t) => t.type.name) || [],
                  artwork:
                    detailData.sprites?.other?.["official-artwork"]
                      ?.front_default,
                  sprite: detailData.sprites?.front_default,
                };
              }
            } catch {
              // fallback if single detail fails
            }
            return {
              id: Number(id),
              name: item.name,
              url: item.url,
              types: [],
            };
          })
        );

        if (isCurrent) {
          setPokemons((prev) =>
            offset === 0 ? enrichedList : [...prev, ...enrichedList]
          );
        }
      } catch (err) {
        if (isCurrent) setError(err.message);
      } finally {
        if (isCurrent) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    }

    fetchBatch();

    return () => {
      isCurrent = false;
    };
  }, [offset]);

  function handleLoadMore() {
    setOffset((prev) => prev + PAGE_SIZE);
  }

  // Filter & Sort Logic
  const processedPokemons = useMemo(() => {
    let list = [...pokemons];

    // Filter by type
    if (selectedType !== "all") {
      list = list.filter((p) =>
        p.types?.some((t) => t.toLowerCase() === selectedType.toLowerCase())
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "number-asc") return a.id - b.id;
      if (sortBy === "number-desc") return b.id - a.id;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

    return list;
  }, [pokemons, selectedType, sortBy]);

  return (
    <section className="library-section" aria-label="Pokémon Library Collection">
      {/* Controls Bar: Type Filters & Sorting */}
      <div className="library-controls-bar">
        <div className="filter-scroll-wrapper">
          <span className="control-label">Type:</span>
          <div className="type-filter-group">
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`type-filter-btn ${
                  selectedType === type ? "is-active" : ""
                } type-${type}`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-group">
          <label htmlFor="sort-select" className="control-label">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select-dropdown"
          >
            <option value="number-asc">Pokédex Number (Lowest First)</option>
            <option value="number-desc">Pokédex Number (Highest First)</option>
            <option value="name-asc">Name (A — Z)</option>
            <option value="name-desc">Name (Z — A)</option>
          </select>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="library-status-bar">
        <p className="library-count-text">
          Showing <strong>{processedPokemons.length}</strong> of{" "}
          <strong>{pokemons.length}</strong> loaded Pokémon
          {selectedType !== "all" && ` (${selectedType.toUpperCase()} type)`}
        </p>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <GridSkeleton count={8} />
      ) : error ? (
        <EmptyState
          title="Could Not Load Pokémon"
          message={`An error occurred while fetching from PokéAPI: ${error}`}
          actionText="Try Again"
          onAction={() => setOffset(0)}
        />
      ) : processedPokemons.length === 0 ? (
        <EmptyState
          title="No Matching Pokémon"
          message={`No ${selectedType.toUpperCase()} Pokémon found in currently loaded batch. Try loading more or reset filters.`}
          actionText="Reset Type Filter"
          onAction={() => setSelectedType("all")}
        />
      ) : (
        <>
          <div className="pokemon-grid">
            {processedPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id || pokemon.name} pokemon={pokemon} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && selectedType === "all" && (
            <div className="load-more-container">
              <button
                type="button"
                className="btn btn-load-more"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <span className="spinner-inline">Loading more Pokémon...</span>
                ) : (
                  <span className="load-more-content">
                    <span>Load More Pokémon</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default PokemonList;
