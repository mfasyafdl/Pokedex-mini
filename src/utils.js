import { SPRITE_BASE_URL, ARTWORK_BASE_URL } from "./config.js";

export function getIdFromUrl(url) {
  if (!url) return "";
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function capitalize(name) {
  if (!name) return "";
  // Handles names with hyphens (e.g. tapu-koko, mr-mime)
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatPokemonId(id) {
  if (!id) return "#000";
  return `#${String(id).padStart(3, "0")}`;
}

export function getSpriteUrl(id) {
  return `${SPRITE_BASE_URL}/${id}.png`;
}

export function getArtworkUrl(id) {
  return `${ARTWORK_BASE_URL}/${id}.png`;
}

// Official Pokemon Type Colors
export const TYPE_COLORS = {
  normal: "#94a3b8",
  fire: "#ef4444",
  water: "#3b82f6",
  electric: "#eab308",
  grass: "#22c55e",
  ice: "#06b6d4",
  fighting: "#b91c1c",
  poison: "#a855f7",
  ground: "#d97706",
  flying: "#818cf8",
  psychic: "#ec4899",
  bug: "#84cc16",
  rock: "#78716c",
  ghost: "#6366f1",
  dragon: "#7c3aed",
  dark: "#334155",
  steel: "#64748b",
  fairy: "#f472b6",
};

export const ALL_TYPES = [
  "all",
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export function getTypeColor(type) {
  if (!type) return "#64748b";
  return TYPE_COLORS[type.toLowerCase()] || "#64748b";
}

export function formatStatName(statName) {
  const map = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  return map[statName] || capitalize(statName);
}

// LocalStorage Favorites Utilities
const FAVORITES_KEY = "pokemon_library_favorites_v1";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(nameOrId) {
  const favorites = getFavorites();
  const search = String(nameOrId).toLowerCase();
  return favorites.some(
    (fav) =>
      fav.name.toLowerCase() === search || String(fav.id) === search
  );
}

export function toggleFavorite(pokemon) {
  if (!pokemon) return false;
  const favorites = getFavorites();
  const index = favorites.findIndex(
    (fav) =>
      fav.name.toLowerCase() === pokemon.name.toLowerCase() ||
      String(fav.id) === String(pokemon.id)
  );

  let updated;
  let status = false;

  if (index >= 0) {
    updated = favorites.filter((_, i) => i !== index);
    status = false;
  } else {
    const newFav = {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types?.map((t) => (typeof t === "string" ? t : t.type.name)) || [],
      sprite: pokemon.sprites?.front_default || getSpriteUrl(pokemon.id),
      artwork:
        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
        getArtworkUrl(pokemon.id),
    };
    updated = [newFav, ...favorites];
    status = true;
  }

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("favorites-updated"));
  } catch (err) {
    console.error("Failed to update favorites:", err);
  }

  return status;
}

// Parse evolution chain from PokéAPI evolution-chain resource
export function parseEvolutionChain(chainNode) {
  if (!chainNode) return [];
  const result = [];

  function traverse(node, fromSpecies = null, details = null) {
    const id = getIdFromUrl(node.species.url);
    const item = {
      name: node.species.name,
      id: Number(id),
      trigger: details?.trigger?.name || null,
      minLevel: details?.min_level || null,
      item: details?.item?.name || null,
      from: fromSpecies,
    };
    result.push(item);

    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach((next) => {
        traverse(next, node.species.name, next.evolution_details?.[0] || null);
      });
    }
  }

  traverse(chainNode);
  return result;
}
