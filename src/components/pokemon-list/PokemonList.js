import React from 'react';
import { useSelector } from 'react-redux';
import { selectPokemons } from '../search/search-slice';

export const PokemonList = () => {
    const pokemons = useSelector(selectPokemons);
    debugger;
    const pokemonsListItems = (pokemons || []).map(pokemon => <li key={pokemon.url}>{pokemon.name}</li>);

    return <ul>{pokemonsListItems}</ul>
};