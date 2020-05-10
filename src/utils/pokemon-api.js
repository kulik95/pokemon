const pokeApiBaseURL = "https://pokeapi.co/api/v2/";
const typesURL = "type";
const typeURL = "type";

export const fetchPokemonTypes = async () => {
  const response = await fetch(`${pokeApiBaseURL}${typesURL}`);
  const resultsJSON = await response.json();
  return resultsJSON.results;
};

export const fetchPokemonsForType = async (type) => {
  if (type === "all") {
    return [];
  }
  const response = await fetch(`${pokeApiBaseURL}${typeURL}/${type}`);
  const resultsJSON = await response.json();
  return resultsJSON.pokemon.map((pokemon) => pokemon.pokemon);
};

export const fetchPokemonsForTypes = async (types) => {
  const pokemonsByType = await Promise.all(
    types.map((type) => fetchPokemonsForType(type))
  );
  return pokemonsByType;
};

const getTypeNumberFromTypeURL = (typeURL) => {
  const typeURLParts = typeURL.split("/").filter((part) => !!part);
  return typeURLParts[typeURLParts.length - 1];
};

export const fetchPokemonsByTypes = (types) => {
  const typeNumbers = types.map((type) => getTypeNumberFromTypeURL(type.url));
  return fetchPokemonsForTypes(typeNumbers).then((pokemonsByTypes) => {
    const allPokemons = [];
    pokemonsByTypes.forEach((pokemons, index) => {
      const pokemonsWithType = pokemons.map((p) => {
        p.types = [types[index]];
        return p;
      });
      allPokemons.push(...pokemonsWithType);
    });

    const pokemonsGroupedByName = new Map();

    allPokemons.forEach((pokemon) => {
      if (!pokemonsGroupedByName.get(pokemon.name)) {
        pokemonsGroupedByName.set(pokemon.name, pokemon);
      } else {
        pokemonsGroupedByName.get(pokemon.name).types.push(pokemon.types[0]);
      }
    });

    const allPokemonsUnique = new Array(...pokemonsGroupedByName.values());
    return allPokemonsUnique;
  });
};
