import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { capitalize, formatPokemonId, getArtworkUrl, parseEvolutionChain } from "../utils.js";

function EvolutionChain({ speciesUrl, currentName }) {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadEvolution() {
      if (!speciesUrl) return;
      setLoading(true);
      setError(null);

      try {
        // 1. Fetch species data to get evolution_chain URL
        const speciesRes = await fetch(speciesUrl);
        if (!speciesRes.ok) throw new Error("Could not load species details.");
        const speciesData = await speciesRes.json();

        if (!speciesData.evolution_chain?.url) {
          if (isCurrent) {
            setStages([]);
            setLoading(false);
          }
          return;
        }

        // 2. Fetch evolution chain
        const evoRes = await fetch(speciesData.evolution_chain.url);
        if (!evoRes.ok) throw new Error("Could not load evolution chain.");
        const evoData = await evoRes.json();

        const parsed = parseEvolutionChain(evoData.chain);
        if (isCurrent) {
          setStages(parsed);
        }
      } catch (err) {
        if (isCurrent) setError(err.message);
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadEvolution();

    return () => {
      isCurrent = false;
    };
  }, [speciesUrl]);

  if (loading) {
    return (
      <div className="evolution-section">
        <h3 className="section-title">Evolution Chain</h3>
        <p className="evolution-loading">Tracing evolutionary line...</p>
      </div>
    );
  }

  if (error || stages.length <= 1) {
    return (
      <div className="evolution-section">
        <h3 className="section-title">Evolution Chain</h3>
        <p className="evolution-single">This Pokémon does not evolve or has a unique evolutionary line.</p>
      </div>
    );
  }

  return (
    <div className="evolution-section">
      <h3 className="section-title">Evolution Chain</h3>
      <div className="evolution-stages-wrap">
        {stages.map((stage, idx) => {
          const isCurrent = stage.name.toLowerCase() === currentName?.toLowerCase();
          const artwork = getArtworkUrl(stage.id);

          return (
            <div key={stage.name} className="evolution-stage-item">
              {idx > 0 && (
                <div className="evolution-arrow-container">
                  <span className="evolution-arrow">→</span>
                  {stage.minLevel && (
                    <span className="evolution-trigger">Lv. {stage.minLevel}</span>
                  )}
                  {stage.item && (
                    <span className="evolution-trigger capitalize">{stage.item.replace("-", " ")}</span>
                  )}
                  {!stage.minLevel && !stage.item && stage.trigger && (
                    <span className="evolution-trigger capitalize">{stage.trigger.replace("-", " ")}</span>
                  )}
                </div>
              )}

              <Link
                to={`/pokemon/${stage.name}`}
                className={`evolution-card ${isCurrent ? "is-current-stage" : ""}`}
              >
                <div className="evolution-image-wrap">
                  <img
                    src={artwork}
                    alt={stage.name}
                    width={96}
                    height={96}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.visibility = "hidden";
                    }}
                  />
                </div>
                <span className="evolution-id">{formatPokemonId(stage.id)}</span>
                <span className="evolution-name">{capitalize(stage.name)}</span>
                {isCurrent && <span className="current-badge">Current</span>}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EvolutionChain;
