import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonsByTypes } from "../../utils/pokemon-api";

const intersection = (setA, setB) => {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
};

const filterPokemons = (pokemons, searchExpression, type, caughtOnly) => {
  const pokemonsFilteredBySearchExpression =
    searchExpression.length > 0
      ? pokemons.filter((pokemon) => pokemon.name.includes(searchExpression))
      : pokemons;

  const pokemonsFilteredByCaughtOnly = caughtOnly
    ? pokemons.filter((pokemon) => {
        return pokemon.caught;
      })
    : pokemons;

  const pokemonsFilteredByType =
    type && type !== "all"
      ? pokemons.filter((p) =>
          p.types.find((pokemonType) => pokemonType.url === type)
        )
      : pokemons;

  let filtersIntersection = intersection(
    intersection(
      new Set(pokemonsFilteredBySearchExpression),
      new Set(pokemonsFilteredByType)
    ),
    new Set(pokemonsFilteredByCaughtOnly)
  );

  return new Array(...filtersIntersection.values());
};

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    pokemonsLoaded: false,
    searchExpression: "",
    type: "",
    caughtOnly: false,
    pokemons: [],
    pokemonsFiltered: [],
    loading: false,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.searchExpression =
        action.payload.searchExpression === undefined
          ? state.searchExpression
          : action.payload.searchExpression;
      state.caughtOnly =
        action.payload.caughtOnly === undefined
          ? state.caughtOnly
          : action.payload.caughtOnly;
      state.type =
        action.payload.type === undefined ? state.type : action.payload.type;

      state.pokemonsFiltered = filterPokemons(
        state.pokemons,
        state.searchExpression,
        state.type,
        state.caughtOnly
      );
    },
    updatePokemons: (state, action) => {
      state.pokemons = action.payload;
      state.pokemonsFiltered = action.payload;
      state.pokemonsLoaded = true;
    },
    updatePokemonStatus: (state, action) => {
      const pokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.name === action.payload.name
      );
      const pokemon = state.pokemons[pokemonIndex];
      state.pokemons.splice(pokemonIndex, 1, {
        ...pokemon,
        caught: action.payload.caught,
      });
      const pokemonFilteredIndex = state.pokemonsFiltered.findIndex(
        (pokemon) => pokemon.name === action.payload.name
      );
      state.pokemonsFiltered.splice(pokemonFilteredIndex, 1, {
        ...pokemon,
        caught: action.payload.caught,
      });
    },
    updateLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const {
  updateFilter,
  updateType,
  updatePokemons,
  updatePokemonStatus,
  updateLoading,
} = searchSlice.actions;

export const fetchAllPokemonsByType = (type) => (dispatch, getState) => {
  if (!getState().search.pokemonsLoaded) {
    dispatch(updateLoading({ loading: true }));
    const types = getState().type.types;

    fetchPokemonsByTypes(types).then((pokemons) => {
      dispatch(updatePokemons(pokemons));
      dispatch(updateFilter({ type: type }));
      dispatch(updateLoading({ loading: false }));
    });
  } else {
    dispatch(updateFilter({ type: type }));
  }
};

export const selectPokemons = (state) => state.search.pokemons;
export const selectPokemonsFiltered = (state) => state.search.pokemonsFiltered;
export const selectCaughtOnly = (state) => state.search.caughtOnly;
export const selectSearchExpression = (state) => state.search.searchExpression;
export const selectLoading = (state) => state.search.loading;

export default searchSlice.reducer;
