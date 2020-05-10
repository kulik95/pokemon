import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Search } from "../search/Search";
import { PokemonList } from "../pokemon-list/PokemonList";

export const PokemonSelector = () => {
  return (
    <Grid stackable columns={2} id="pokemonAppContainer">
      <Grid.Column>
        <Segment id="pokemonSearchSegment">
          <Search />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment id="pokemonListSegment">
          <PokemonList />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
