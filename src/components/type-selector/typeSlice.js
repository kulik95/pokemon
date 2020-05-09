import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonTypes } from '../../utils/pokemon-api'; 

const allTypes = { name: 'all', url: 'all' }

export const typeSlice = createSlice({
    name: 'type',
    initialState: { loading: false, types: [] },
    reducers: {
        startLoading: state => {
            state.loading = true;
        },
        abortLoading: state => {
            state.loading = false;
        },
        finishLoading: (state, action) => {
            state.loading = false;
            state.types = [allTypes, ...action.payload];
        }
    }
});

export const { startLoading, abortLoading, finishLoading } = typeSlice.actions;

export const fetchTypes =  () => dispatch => {
    dispatch(startLoading());
    fetchPokemonTypes().then(pokemonTypes => {
        dispatch(finishLoading(pokemonTypes));
    });
};

export const selectTypes = state => state.type.types;
export const selectLoadingState = state => state.type.loading;

export default typeSlice.reducer;