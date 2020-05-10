import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonsForType as fetchPokemonsForTypeUtil } from '../../utils/pokemon-api';

export const searchSlice = createSlice({
    name: 'search',
    initialState: { searchExpression: '', type: '', caughtOnly: false, pokemons: [], caughtPokemons: [], pokemonsFiltered: [] },
    reducers: {
        updateFilter: (state, action) => {
            state.searchExpression = action.payload.searchExpression === undefined ? state.searchExpression : action.payload.searchExpression;
            state.caughtOnly = action.payload.caughtOnly === undefined ? state.caughtOnly : action.payload.caughtOnly;

            const pokemonsFilteredBySearchExpression = state.searchExpression.length > 0 ? 
                state.pokemons.filter(pokemon => pokemon.name.includes(state.searchExpression)) : state.pokemons;

            const pokemonsFilteredByCaughtOnlyAndSearch = state.caughtOnly ? pokemonsFilteredBySearchExpression.filter(pokemon => {
                return new Set(state.caughtPokemons).has(pokemon);
            }) : pokemonsFilteredBySearchExpression;

            state.pokemonsFiltered = pokemonsFilteredByCaughtOnlyAndSearch;
        },
        updateType: (state, action) => {
            state.type = action.payload;
            state.searchExpression = '';
            state.caughtOnly = false;
        },
        updatePokemons: (state, action) => {
            state.pokemons = action.payload;
            state.pokemonsFiltered = action.payload;
        }
    }
});

export const { updateFilter, updateType, updatePokemons } = searchSlice.actions;

const getTypeNumberFromTypeURL = typeURL => {
    const typeURLParts = typeURL.split('/').filter(part => !!part);
    return typeURLParts[typeURLParts.length - 1];
};

export const fetchPokemonsForType = type => dispatch => {
    debugger;
    dispatch(updateType(type));
    const typeNumber = getTypeNumberFromTypeURL(type);
    fetchPokemonsForTypeUtil(typeNumber).then(pokemons => {
        debugger;
        dispatch(updatePokemons(pokemons));
    });
};

export const selectPokemons = state => state.search.pokemons;
export const selectPokemonsFiltered = state => state.search.pokemonsFiltered;
export const selectCaughtOnly = state => state.search.caughtOnly;
export const selectSearchExpression = state => state.search.searchExpression;

export default searchSlice.reducer;