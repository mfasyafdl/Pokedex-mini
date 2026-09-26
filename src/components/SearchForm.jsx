import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUICK_SEARCHES = ["Pikachu", "Charizard", "Gengar", "Mewtwo", "Eevee", "Gyarados"];

function SearchForm({ placeholder = "Search by Pokémon name or Pokédex number..." }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function executeSearch(input) {
    const raw = (input || query).trim();
    if (!raw) {
      setError("Please enter a Pokémon name or number first.");
      return;
    }

    setError(null);

    // If numerical query like 025 or 25, parse it
    if (/^\d+$/.test(raw)) {
      const parsedNumber = parseInt(raw, 10);
      navigate(`/pokemon/${parsedNumber}`);
      return;
    }

    const cleanName = raw.toLowerCase().replace(/\s+/g, "-");
    navigate(`/pokemon/${cleanName}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    executeSearch(query);
  }

  function handleClear() {
    setQuery("");
    setError(null);
  }

  return (
    <div className="search-component">
      <form onSubmit={handleSubmit} className="search-form-enhanced">
        <div className="search-input-wrapper">
          <svg
            className="search-input-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            className="search-input-field"
            aria-label="Search Pokémon"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear-btn"
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <button type="submit" className="btn btn-search">
          <span>Search</span>
        </button>
      </form>

      {error && <p className="status-message status-error">{error}</p>}

      {/* Quick Suggestion Chips */}
      <div className="quick-search-chips">
        <span className="chips-label">Popular:</span>
        {QUICK_SEARCHES.map((name) => (
          <button
            key={name}
            type="button"
            className="chip-btn"
            onClick={() => {
              setQuery(name);
              executeSearch(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchForm;
