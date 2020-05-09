const pokeApiBaseURL = 'https://pokeapi.co/api/v2/';
const typesURL = 'type';

export const fetchPokemonTypes = async () => {
    const response = await fetch(`${pokeApiBaseURL}${typesURL}`);
    const resultsJSON = await response.json();
    return resultsJSON.results;
};