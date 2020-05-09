import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonsForType as fetchPokemonsForTypeUtil } from '../../utils/pokemon-api';

export const searchSlice = createSlice({
    name: 'search',
    initialState: { searchExpression: '', type: '', caughtOnly: false, pokemons: [], caughtPokemons: [] },
    reducers: {
        updateSearchExpression: (state, action) => {
            state.searchExpression = action.payload;
        },
        updateType: (state, action) => {
            state.type = action.payload;
            state.searchExpression = '';
            state.caughtOnly = false;
        },
        updateCaughtOnly: (state, action) => {
            state.caughtOnly = action.payload;
        },
        updatePokemons: (state, action) => {
            state.pokemons = action.payload;
        }
    }
});

export const { updateSearchExpression, updateType, updateCaughtOnly, updatePokemons } = searchSlice.actions;

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

export default searchSlice.reducer;