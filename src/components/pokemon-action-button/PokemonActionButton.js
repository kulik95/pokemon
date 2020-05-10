import React from "react";
import { updatePokemonStatus } from "../search/search-slice";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";

export const PokemonActionButton = ({ pokemon }) => {
  const dispatch = useDispatch();
  return (
    <Button
      className="pokemonActionButton"
      color={pokemon.caught ? "yellow" : "blue"}
      fluid
      onClick={() =>
        dispatch(
          updatePokemonStatus({
            name: pokemon.name,
            caught: !pokemon.caught,
          })
        )
      }
    >
      {pokemon.caught ? "Release" : "Catch"}
    </Button>
  );
};
