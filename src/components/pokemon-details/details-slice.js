import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonDetail } from "../../utils/pokemon-api";

export const detailsSlice = createSlice({
  name: "details",
  initialState: { selectedPokemon: "", details: {} },
  reducers: {
    updateSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload.selectedPokemon;
    },
    updatePokemonDetails: (state, action) => {
      state.details = action.payload.details;
    },
  },
});

export const {
  updateSelectedPokemon,
  updatePokemonDetails,
} = detailsSlice.actions;

export const fetchPokemonDetails = () => (dispatch, getState) => {
  fetchPokemonDetail(getState().details.selectedPokemon).then((result) => {
    console.log(result);
    dispatch(updatePokemonDetails({ details: result }));
  });
};

export const selectPokemon = (state) => state.details.selectedPokemon;
export const selectPokemonDetails = (state) => state.details.details;

export default detailsSlice.reducer;
