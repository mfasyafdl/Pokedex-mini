export function CardSkeleton() {
  return (
    <div className="pokemon-card skeleton-card">
      <div className="skeleton-image shimmer" />
      <div className="skeleton-text skeleton-id shimmer" />
      <div className="skeleton-text skeleton-title shimmer" />
      <div className="skeleton-badges">
        <span className="skeleton-badge shimmer" />
        <span className="skeleton-badge shimmer" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="pokemon-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="detail-page detail-skeleton">
      <div className="skeleton-nav shimmer" />
      <div className="detail-hero-skeleton">
        <div className="skeleton-artwork shimmer" />
        <div className="detail-info-skeleton">
          <div className="skeleton-text skeleton-title-lg shimmer" />
          <div className="skeleton-badges">
            <span className="skeleton-badge shimmer" />
            <span className="skeleton-badge shimmer" />
          </div>
          <div className="skeleton-stats-block shimmer" />
        </div>
      </div>
    </div>
  );
}

export default GridSkeleton;
