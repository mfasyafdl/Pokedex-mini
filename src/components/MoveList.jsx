import { useState } from "react";
import { API_BASE_URL } from "../config.js";
import { capitalize, getTypeColor } from "../utils.js";
import TypeBadge from "./TypeBadge.jsx";

const INITIAL_LIMIT = 12;

function MoveList({ moves }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const [expandedMove, setExpandedMove] = useState(null);
  const [moveDetails, setMoveDetails] = useState({});
  const [loadingMove, setLoadingMove] = useState(null);

  if (!moves || moves.length === 0) return null;

  const currentMoves = moves.slice(0, visibleCount);
  const hasMore = visibleCount < moves.length;

  async function handleToggleMove(moveName) {
    if (expandedMove === moveName) {
      setExpandedMove(null);
      return;
    }

    setExpandedMove(moveName);

    if (!moveDetails[moveName] && loadingMove !== moveName) {
      setLoadingMove(moveName);
      try {
        const res = await fetch(`${API_BASE_URL}/move/${moveName}`);
        if (res.ok) {
          const data = await res.json();
          const englishEffect =
            data.effect_entries?.find((e) => e.language.name === "en") ||
            data.flavor_text_entries?.find((e) => e.language.name === "en");

          setMoveDetails((prev) => ({
            ...prev,
            [moveName]: {
              type: data.type?.name || "normal",
              power: data.power ?? "—",
              accuracy: data.accuracy ? `${data.accuracy}%` : "—",
              pp: data.pp ?? "—",
              damageClass: data.damage_class?.name || "—",
              effect:
                englishEffect?.short_effect ||
                englishEffect?.effect ||
                englishEffect?.flavor_text ||
                "No description available.",
            },
          }));
        }
      } catch (err) {
        setMoveDetails((prev) => ({
          ...prev,
          [moveName]: { error: "Failed to load move details." },
        }));
      } finally {
        setLoadingMove(null);
      }
    }
  }

  return (
    <div className="moves-section">
      <div className="section-header-flex">
        <h3 className="section-title">Moves ({moves.length})</h3>
        <span className="section-subtitle">Click any move to inspect details</span>
      </div>

      <div className="moves-grid">
        {currentMoves.map(({ move }) => {
          const isOpen = expandedMove === move.name;
          const details = moveDetails[move.name];
          const isLoading = loadingMove === move.name;

          return (
            <div
              key={move.name}
              className={`move-card ${isOpen ? "is-expanded" : ""}`}
              onClick={() => handleToggleMove(move.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleToggleMove(move.name);
                }
              }}
            >
              <div className="move-card-header">
                <span className="move-name">{capitalize(move.name)}</span>
                {details?.type && <TypeBadge type={details.type} size="sm" />}
                <span className="move-expand-icon">{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && (
                <div className="move-card-details">
                  {isLoading ? (
                    <p className="move-loading">Loading move stats...</p>
                  ) : details?.error ? (
                    <p className="move-error">{details.error}</p>
                  ) : (
                    <>
                      <div className="move-stat-pills">
                        <div className="move-pill">
                          <span className="move-pill-label">Power</span>
                          <span className="move-pill-val">{details.power}</span>
                        </div>
                        <div className="move-pill">
                          <span className="move-pill-label">Accuracy</span>
                          <span className="move-pill-val">{details.accuracy}</span>
                        </div>
                        <div className="move-pill">
                          <span className="move-pill-label">PP</span>
                          <span className="move-pill-val">{details.pp}</span>
                        </div>
                        <div className="move-pill">
                          <span className="move-pill-label">Class</span>
                          <span className="move-pill-val capitalize">{details.damageClass}</span>
                        </div>
                      </div>
                      <p className="move-effect-text">{details.effect}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="moves-pagination-bar">
        {hasMore ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setVisibleCount((prev) => prev + 12)}
          >
            Show More Moves ({moves.length - visibleCount} remaining)
          </button>
        ) : (
          moves.length > INITIAL_LIMIT && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setVisibleCount(INITIAL_LIMIT)}
            >
              Show Less
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default MoveList;
