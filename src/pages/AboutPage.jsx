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
          <div className="about-card-icon">⚡</div>
          <h3>Comprehensive Database</h3>
          <p>
            Explore Pokémon across all generations. Access detailed physical profiles, base battle stats, official artwork, and species classifications.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">🧬</div>
          <h3>Evolution Trees</h3>
          <p>
            Trace full evolutionary lines with requirements such as minimum levels, evolutionary stones, and special conditions.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">⚔️</div>
          <h3>Battle Analytics</h3>
          <p>
            Inspect moves and abilities with on-demand retrieval of power, accuracy, power points (PP), damage class, and effect descriptions.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">💾</div>
          <h3>Client-Side Favorites</h3>
          <p>
            Bookmark your favorite Pokémon with seamless local persistence via browser localStorage, without needing accounts or databases.
          </p>
        </div>
      </div>

      <div className="about-tech-section">
        <h3>Architecture & Technologies</h3>
        <ul className="tech-badge-list">
          <li className="tech-badge">React 19</li>
          <li className="tech-badge">Vite 8</li>
          <li className="tech-badge">React Router (HashRouter)</li>
          <li className="tech-badge">PokéAPI v2</li>
          <li className="tech-badge">Modern Vanilla CSS</li>
          <li className="tech-badge">GitHub Pages Ready</li>
        </ul>
      </div>

      <div className="about-cta">
        <Link to="/" className="btn btn-primary">
          Explore the Library →
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
