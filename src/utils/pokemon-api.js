const pokeApiBaseURL = 'https://pokeapi.co/api/v2/';
const typesURL = 'type';
const typeURL = 'type';
const allPokemonsURL = 'pokemon';

export const fetchPokemonTypes = async () => {
    const response = await fetch(`${pokeApiBaseURL}${typesURL}`);
    const resultsJSON = await response.json();
    return resultsJSON.results;
};

export const fetchPokemonsForType = async (type) => {
    if (type === 'all') {
        //const response = await fetch(`${pokeApiBaseURL}${allPokemonsURL}?offset=0&limit=1000`);
        //const resultsJSON = await response.json();
        return [];//resultsJSON.results;    
    } else {
        const response = await fetch(`${pokeApiBaseURL}${typeURL}/${type}`);
        const resultsJSON = await response.json();
        return resultsJSON.pokemon.map(pokemon => pokemon.pokemon);    
    }
};

export const fetchPokemonsForTypes = async (types) => {
    const pokemonsByType = await Promise.all(types.map(type => fetchPokemonsForType(type)));
    debugger;
    return pokemonsByType;
};