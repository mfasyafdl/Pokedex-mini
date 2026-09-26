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
                viewBox="0 0 100 100"
                width="34"
                height="34"
              >
                <defs>
                  <linearGradient id="headerPokeRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d4d" />
                    <stop offset="60%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                  <linearGradient id="headerPokeWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="#0f172a" />
                <path d="M 6 50 A 44 44 0 0 1 94 50 Z" fill="url(#headerPokeRed)" />
                <path d="M 16 44 A 36 36 0 0 1 84 44 A 44 44 0 0 0 16 44 Z" fill="#ffffff" opacity="0.35" />
                <path d="M 6 50 A 44 44 0 0 0 94 50 Z" fill="url(#headerPokeWhite)" />
                <rect x="4" y="46" width="92" height="8" fill="#0f172a" />
                <circle cx="50" cy="50" r="15" fill="#0f172a" />
                <circle cx="50" cy="50" r="11" fill="#ffffff" />
                <circle cx="50" cy="50" r="7" fill="#0f172a" />
                <circle cx="50" cy="50" r="5" fill="#f8fafc" />
                <circle cx="48" cy="48" r="1.8" fill="#ffffff" />
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
