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

/**
 * Filters list of pokemons based on searchExpression, type and whether it is caught or not
 *
 * @param {Array} pokemons List of all pokemons.
 * @param {string} searchExpression Search expression.
 * @param {string} type Pokemon type.
 * @param {boolean} caughtOnly List only caught pokemons.
 * @return {Array} List of pokemons filtered.
 */
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
    updateType: (state, action) => {
      state.type = action.payload.type;
      state.pokemonsFiltered = filterPokemons(
        state.pokemons,
        state.searchExpression,
        state.type,
        state.caughtOnly
      );
    },
    updateSearchExpression: (state, action) => {
      state.searchExpression = action.payload.searchExpression;
      state.pokemonsFiltered = filterPokemons(
        state.pokemons,
        state.searchExpression,
        state.type,
        state.caughtOnly
      );
    },
    updateCaughtOnly: (state, action) => {
      state.caughtOnly = action.payload.caughtOnly;
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
    /**
     * Update caught status of pokemon in both the list of all pokemons and in the list of filtered pokemons
     */
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
  updateType,
  updateSearchExpression,
  updateCaughtOnly,
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
      dispatch(updateType({ type: type }));
      dispatch(updateLoading({ loading: false }));
    });
  } else {
    dispatch(updateType({ type: type }));
  }
};

export const selectPokemonsFiltered = (state) => state.search.pokemonsFiltered;
export const selectCaughtOnly = (state) => state.search.caughtOnly;
export const selectSearchExpression = (state) => state.search.searchExpression;
export const selectLoading = (state) => state.search.loading;
export const selectIsPokemonCaught = (pokemonName) => (state) => {
  const pokemon = state.search.pokemons.find((p) => p.name === pokemonName);
  return pokemon && pokemon.caught;
};

export default searchSlice.reducer;
