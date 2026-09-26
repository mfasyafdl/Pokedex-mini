import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config.js";
import { capitalize } from "../utils.js";

function AbilityList({ abilities }) {
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    let isCurrent = true;
    if (!abilities || abilities.length === 0) return;

    // Load simple descriptions automatically so user gets instant clean info
    abilities.forEach(({ ability }) => {
      fetch(`${API_BASE_URL}/ability/${ability.name}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!data || !isCurrent) return;
          const entry =
            data.effect_entries?.find((e) => e.language.name === "en") ||
            data.flavor_text_entries?.find((e) => e.language.name === "en");
          const text =
            entry?.short_effect ||
            entry?.effect ||
            entry?.flavor_text ||
            "Standard passive ability.";
          setDescriptions((prev) => ({ ...prev, [ability.name]: text }));
        })
        .catch(() => {
          // Graceful fallback
        });
    });

    return () => {
      isCurrent = false;
    };
  }, [abilities]);

  if (!abilities || abilities.length === 0) return null;

  return (
    <div className="abilities-section">
      <div className="section-header-flex">
        <h3 className="section-title">Innate Abilities</h3>
      </div>
      <div className="abilities-grid">
        {abilities.map(({ ability, is_hidden, slot }) => {
          const desc = descriptions[ability.name];

          return (
            <div key={ability.name} className="ability-card is-streamlined">
              <div className="ability-header">
                <div className="ability-title-group">
                  <span className="ability-name">{capitalize(ability.name)}</span>
                  {is_hidden ? (
                    <span className="hidden-badge">Hidden Ability</span>
                  ) : (
                    <span className="ability-slot-badge">Slot {slot || 1}</span>
                  )}
                </div>
              </div>
              <p className="ability-description">
                {desc || "Loading ability details..."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AbilityList;
