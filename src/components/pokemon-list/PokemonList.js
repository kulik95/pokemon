import React from "react";
import { useSelector } from "react-redux";
import { Grid, Segment, Button } from "semantic-ui-react";
import { selectPokemonsFiltered } from "../search/search-slice";
import "./PokemonList.css";

const capitalize = (text) => {
  const firstLetterUpperCase = text[0].toUpperCase();
  const capitalizedText = firstLetterUpperCase + text.slice(1);
  return capitalizedText;
};

const PokemonInfo = (props) => {
  return (
    <Segment.Group horizontal>
      <Segment basic>{capitalize(props.pokemon.name)} </Segment>
      <Segment basic>
        {props.pokemon.types.map((type) => type.name).join(", ")}
      </Segment>
      <Segment basic>-</Segment>
    </Segment.Group>
  );
};

export const PokemonList = () => {
  const pokemons = useSelector(selectPokemonsFiltered);
  const pokemonRows = (pokemons || []).map((pokemon) => (
    <Grid.Row key={pokemon.url}>
      <Grid.Column width={12}>
        <PokemonInfo pokemon={pokemon} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Button className="catchButton" fluid>
          Catch
        </Button>
      </Grid.Column>
    </Grid.Row>
  ));

  const headerRow = (
    <Grid.Row>
      <Grid.Column width={12}></Grid.Column>
    </Grid.Row>
  );

  return <Grid columns={2}>{pokemonRows}</Grid>;
};
