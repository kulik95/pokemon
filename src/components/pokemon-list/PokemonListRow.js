import React from "react";
import { useDispatch } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import { updatePokemonStatus } from "../search/search-slice";
import { PokemonInfo } from "./PokemonInfo";

export const PokemonListRow = ({ pokemon }) => {
  const dispatch = useDispatch();

  const pokemonActionButton = (
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

  return (
    <Grid.Row key={pokemon.url}>
      <Grid.Column width={12}>
        <PokemonInfo pokemon={pokemon} />
      </Grid.Column>
      <Grid.Column width={4}>{pokemonActionButton}</Grid.Column>
    </Grid.Row>
  );
};
