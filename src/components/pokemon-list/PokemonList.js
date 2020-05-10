import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Segment, Button, Loader, Dimmer } from "semantic-ui-react";
import {
  selectPokemonsFiltered,
  updatePokemonStatus,
  selectLoading,
} from "../search/search-slice";
import "./PokemonList.css";

const capitalize = (text) => {
  const firstLetterUpperCase = text[0].toUpperCase();
  const capitalizedText = firstLetterUpperCase + text.slice(1);
  return capitalizedText;
};

const PokemonInfo = (props) => {
  return (
    <Segment.Group
      className={`pokemonInfoSegmentGroup ${
        props.pokemon.caught ? "yellow" : "blue"
      }`}
      horizontal
    >
      <Segment className="pokemonInfoSegment" basic>
        {capitalize(props.pokemon.name)}
      </Segment>
      <Segment className="pokemonInfoSegment" basic>
        {props.pokemon.types.map((type) => type.name).join(", ")}
      </Segment>
      <Segment className="pokemonInfoSegment" basic>
        {props.pokemon.caught ? "Caught" : "-"}
      </Segment>
    </Segment.Group>
  );
};

const PokemonInfoHeader = () => {
  return (
    <Segment.Group className="pokemonHeaderSegmentGroup" horizontal>
      <Segment className="pokemonHeaderSegment">Name</Segment>
      <Segment className="pokemonHeaderSegment">Type</Segment>
      <Segment className="pokemonHeaderSegment">Status</Segment>
    </Segment.Group>
  );
};

export const PokemonList = () => {
  const pokemons = useSelector(selectPokemonsFiltered);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const pokemonRows = pokemons.map((pokemon) => (
    <Grid.Row key={pokemon.url}>
      <Grid.Column width={12}>
        <PokemonInfo pokemon={pokemon} />
      </Grid.Column>
      <Grid.Column width={4}>
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
      </Grid.Column>
    </Grid.Row>
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
