import SearchForm from "../components/SearchForm.jsx";
import PokemonList from "../components/PokemonList.jsx";

function ListPage() {
  return (
    <div className="list-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">
            Pokédex <span className="text-highlight">Collection</span>
          </h1>
          <p className="hero-description">
            Browse Pokémon across all generations. View official stats, examine innate abilities, and trace complete evolutionary lineages.
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
