import React from "react";
import { Grid } from "semantic-ui-react";
import { PokemonInfo } from "./PokemonInfo";
import { PokemonActionButton } from "../pokemon-action-button/PokemonActionButton";

export const PokemonListRow = ({ pokemon }) => {
  return (
    <Grid.Row key={pokemon.url}>
      <Grid.Column width={12}>
        <PokemonInfo pokemon={pokemon} />
      </Grid.Column>
      <Grid.Column width={4}>
        <PokemonActionButton pokemon={pokemon} />
      </Grid.Column>
    </Grid.Row>
  );
};
