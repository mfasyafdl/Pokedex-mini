import { useEffect } from "react";
import EmptyState from "../components/EmptyState.jsx";

function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found | Pokémon Library";
  }, []);

  return (
    <div className="not-found-page">
      <EmptyState
        title="Wild 404 Appeared!"
        message="The page or Pokémon you were trying to access does not exist in this library."
        actionText="Back to Library"
        actionTo="/"
      />
    </div>
  );
}

export default NotFoundPage;
