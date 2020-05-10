import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPokemonsForType as fetchPokemonsForTypeUtil,
  fetchPokemonsForTypes,
} from "../../utils/pokemon-api";

const intersection = (setA, setB) => {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
};

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    pokemonsLoaded: false,
    searchExpression: "",
    type: "",
    caughtOnly: false,
    pokemons: [],
    caughtPokemons: [],
    pokemonsFiltered: [],
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

      const pokemonsFilteredBySearchExpression =
        state.searchExpression.length > 0
          ? state.pokemons.filter((pokemon) =>
              pokemon.name.includes(state.searchExpression)
            )
          : state.pokemons;

      const pokemonsFilteredByCaughtOnly = state.caughtOnly
        ? state.pokemons.filter((pokemon) => {
            return new Set(state.caughtPokemons).has(pokemon);
          })
        : state.pokemons;

      const pokemonsFilteredByType =
        state.type && state.type !== "all"
          ? state.pokemons.filter((p) =>
              p.types.find((type) => type.url === state.type)
            )
          : state.pokemons;

      let filtersIntersection = intersection(
        intersection(
          new Set(pokemonsFilteredBySearchExpression),
          new Set(pokemonsFilteredByType)
        ),
        new Set(pokemonsFilteredByCaughtOnly)
      );

      state.pokemonsFiltered = new Array(...filtersIntersection.values());
    },
    updatePokemons: (state, action) => {
      state.pokemons = action.payload;
      state.pokemonsFiltered = action.payload;
      state.pokemonsLoaded = true;
    },
  },
});

export const { updateFilter, updateType, updatePokemons } = searchSlice.actions;

const getTypeNumberFromTypeURL = (typeURL) => {
  const typeURLParts = typeURL.split("/").filter((part) => !!part);
  return typeURLParts[typeURLParts.length - 1];
};

export const fetchPokemonsForType = (type) => (dispatch) => {
  dispatch(updateType(type));
  const typeNumber = getTypeNumberFromTypeURL(type);
  fetchPokemonsForTypeUtil(typeNumber).then((pokemons) => {
    dispatch(updatePokemons(pokemons));
  });
};

export const fetchAllPokemonsByType = (type) => (dispatch, getState) => {
  if (!getState().search.pokemonsLoaded) {
    const types = getState().type.types;
    const typeNumbers = types.map((type) => getTypeNumberFromTypeURL(type.url));
    fetchPokemonsForTypes(typeNumbers).then((pokemonsByTypes) => {
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

      const allPokemonsUniqe = new Array(...pokemonsGroupedByName.values());

      dispatch(updatePokemons(allPokemonsUniqe));
      dispatch(updateFilter({ type: type }));
    });
  } else {
    dispatch(updateFilter({ type: type }));
  }
};

export const selectPokemons = (state) => state.search.pokemons;
export const selectPokemonsFiltered = (state) => state.search.pokemonsFiltered;
export const selectCaughtOnly = (state) => state.search.caughtOnly;
export const selectSearchExpression = (state) => state.search.searchExpression;

export default searchSlice.reducer;
