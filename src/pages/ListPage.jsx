import SearchForm from "../components/SearchForm.jsx";
import PokemonList from "../components/PokemonList.jsx";

function ListPage() {
  return (
    <div className="list-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <span className="hero-pill">Digital Encyclopedia</span>
          </div>
          <h1 className="hero-title">
            Explore the World of <span className="text-highlight">Pokémon</span>
          </h1>
          <p className="hero-description">
            Discover Pokémon across all generations. Examine their official stats, learn their moves, inspect their abilities, and trace evolutionary paths.
          </p>

          <SearchForm />
        </div>
      </section>

      {/* Main Library Collection */}
      <PokemonList />
    </div>
  );
}

export default ListPage;
