import { getTypeColor, capitalize } from "../utils.js";

function TypeBadge({ type, size = "md" }) {
  if (!type) return null;
  const color = getTypeColor(type);

  return (
    <span
      className={`type-badge type-badge-${size}`}
      style={{
        backgroundColor: color,
        color: "#ffffff",
      }}
    >
      {capitalize(type)}
    </span>
  );
}

export default TypeBadge;
