import React from "react";
import { useSelector } from "react-redux";
import { Grid, Loader, Dimmer } from "semantic-ui-react";
import { selectPokemonsFiltered, selectLoading } from "../search/search-slice";
import { PokemonInfoHeader } from "./PokemonInfoHeader";
import { PokemonListRow } from "./PokemonListRow";
import "./PokemonList.css";

export const PokemonList = () => {
  const pokemons = useSelector(selectPokemonsFiltered);
  const loading = useSelector(selectLoading);
  const pokemonRows = pokemons.map((pokemon) => (
    <PokemonListRow key={pokemon.name} pokemon={pokemon} />
  ));

  const headerRow = (
    <Grid.Row id="pokemonInfoHeaderRow">
      <Grid.Column width={12}>
        <PokemonInfoHeader />
      </Grid.Column>
    </Grid.Row>
  );

  const loader = (
    <Grid.Row>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Grid.Row>
  );

  const list = (
    <Grid columns={2}>
      {headerRow}
      {loading ? loader : pokemonRows}
    </Grid>
  );

  return <>{list}</>;
};
