import { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { getFavorites } from "../utils.js";

function Layout() {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function updateCount() {
      setFavoriteCount(getFavorites().length);
    }
    updateCount();

    window.addEventListener("favorites-updated", updateCount);
    return () => window.removeEventListener("favorites-updated", updateCount);
  }, []);

  return (
    <div className="app-shell">
      {/* Authentic Pokédex Console Lights Bar */}
      <div className="pokedex-top-bar" aria-hidden="true">
        <div className="sensor-orb-glow">
          <div className="sensor-orb" />
        </div>
        <div className="indicator-lights">
          <span className="light light-red" />
          <span className="light light-yellow" />
          <span className="light light-green" />
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-icon-wrap">
              <svg
                className="pokeball-svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.5" fill="#ffffff" />
                <path d="M2 12H22" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M2 12A10 10 0 0 1 22 12" fill="#ef4444" />
                <circle cx="12" cy="12" r="3.5" stroke="#1e293b" strokeWidth="2.5" fill="#ffffff" />
                <circle cx="12" cy="12" r="1.5" fill="#1e293b" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">Pokémon Library</span>
              <span className="brand-subtitle">Explore. Discover. Collect Knowledge.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Library
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Favorites
              {favoriteCount > 0 && (
                <span className="nav-badge" aria-label={`${favoriteCount} saved favorites`}>
                  {favoriteCount}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              About
            </NavLink>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Library
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Favorites {favoriteCount > 0 && `(${favoriteCount})`}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
          </nav>
        )}
      </header>

      {/* Main Outlet */}
      <main className="app-main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            <strong>Pokémon Library</strong> — Digital Pokémon Encyclopedia & Reference.
          </p>
          <p className="footer-credit">
            Data sourced from <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a>. Pokémon and Pokémon character names are trademarks of Nintendo.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
