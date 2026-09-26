import { useState } from "react";
import { API_BASE_URL } from "../config.js";
import { capitalize } from "../utils.js";

function AbilityList({ abilities }) {
  const [expanded, setExpanded] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [loading, setLoading] = useState({});

  if (!abilities || abilities.length === 0) return null;

  async function toggleAbility(abilityName) {
    const isNowExpanded = !expanded[abilityName];
    setExpanded((prev) => ({ ...prev, [abilityName]: isNowExpanded }));

    // Fetch effect description on-demand if not already fetched
    if (isNowExpanded && !descriptions[abilityName] && !loading[abilityName]) {
      setLoading((prev) => ({ ...prev, [abilityName]: true }));
      try {
        const res = await fetch(`${API_BASE_URL}/ability/${abilityName}`);
        if (res.ok) {
          const data = await res.json();
          // Find English effect entry
          const englishEntry =
            data.effect_entries?.find((e) => e.language.name === "en") ||
            data.flavor_text_entries?.find((e) => e.language.name === "en");

          const effect =
            englishEntry?.short_effect ||
            englishEntry?.effect ||
            englishEntry?.flavor_text ||
            "No description available for this ability.";

          setDescriptions((prev) => ({ ...prev, [abilityName]: effect }));
        }
      } catch (err) {
        setDescriptions((prev) => ({
          ...prev,
          [abilityName]: "Could not load ability details.",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [abilityName]: false }));
      }
    }
  }

  return (
    <div className="abilities-section">
      <h3 className="section-title">Abilities</h3>
      <div className="abilities-grid">
        {abilities.map(({ ability, is_hidden }) => {
          const isOpen = !!expanded[ability.name];
          const desc = descriptions[ability.name];
          const isLoading = loading[ability.name];

          return (
            <div
              key={ability.name}
              className={`ability-card ${isOpen ? "is-open" : ""}`}
              onClick={() => toggleAbility(ability.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleAbility(ability.name);
                }
              }}
            >
              <div className="ability-header">
                <span className="ability-name">{capitalize(ability.name)}</span>
                {is_hidden && <span className="hidden-badge">Hidden</span>}
                <span className="ability-toggle-icon">{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && (
                <div className="ability-content">
                  {isLoading ? (
                    <p className="ability-loading">Loading ability effect...</p>
                  ) : (
                    <p className="ability-description">{desc}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AbilityList;
