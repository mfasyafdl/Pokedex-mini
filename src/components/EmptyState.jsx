import { Link } from "react-router-dom";

function EmptyState({
  title = "No Pokémon Found",
  message = "We couldn't find any Pokémon matching your criteria.",
  actionText = "Back to Library",
  actionTo = "/",
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <circle cx="12" cy="12" r="3.5" fill="#fff" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onAction ? (
        <button type="button" onClick={onAction} className="btn btn-primary">
          {actionText}
        </button>
      ) : actionTo ? (
        <Link to={actionTo} className="btn btn-primary">
          {actionText}
        </Link>
      ) : null}
    </div>
  );
}

export default EmptyState;
