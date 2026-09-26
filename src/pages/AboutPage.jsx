import { useEffect } from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  useEffect(() => {
    document.title = "About | Pokémon Library";
  }, []);

  return (
    <div className="about-page">
      <div className="about-hero">
        <span className="hero-pill">Project Overview</span>
        <h1 className="page-title">About Pokémon Library</h1>
        <p className="about-intro">
          Pokémon Library is an interactive, modern digital encyclopedia engineered with React, React Router, and the open-source PokéAPI.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-card-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <h3>Comprehensive Database</h3>
          <p>
            Explore Pokémon across all generations. Access detailed physical profiles, base battle stats, official artwork, and species classifications.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="18" r="3" />
              <path d="M6 9v3a6 6 0 0 0 6 6h3" />
            </svg>
          </div>
          <h3>Evolution Lineages</h3>
          <p>
            Trace complete evolutionary branches with required evolution triggers, minimum levels, evolutionary stones, and progression paths.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3>Abilities &amp; Statistics</h3>
          <p>
            Inspect calibrated base statistics across HP, Attack, Defense, Special Attack, Special Defense, and Speed alongside unique innate abilities.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3>Client-Side Favorites</h3>
          <p>
            Bookmark your favorite Pokémon with seamless local persistence via browser localStorage, without needing accounts or databases.
          </p>
        </div>
      </div>

      <div className="about-tech-section">
        <h3>Architecture &amp; Technologies</h3>
        <ul className="tech-badge-list">
          <li className="tech-badge">React 19</li>
          <li className="tech-badge">Vite 8</li>
          <li className="tech-badge">React Router (HashRouter)</li>
          <li className="tech-badge">PokéAPI v2</li>
          <li className="tech-badge">Modern CSS Design System</li>
          <li className="tech-badge">GitHub Pages</li>
        </ul>
      </div>

      <div className="about-cta">
        <Link to="/" className="btn btn-primary">
          <span>Explore the Library</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
