import { formatStatName } from "../utils.js";

function getStatColor(statName, value) {
  if (value >= 120) return "#22c55e"; // Excellent (Green)
  if (value >= 90) return "#3b82f6";  // Great (Blue)
  if (value >= 60) return "#eab308";  // Average (Yellow)
  return "#f97316";                   // Low (Orange)
}

function StatBar({ name, value, max = 255 }) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const color = getStatColor(name, value);

  return (
    <div className="stat-row">
      <span className="stat-label">{formatStatName(name)}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

export default StatBar;
