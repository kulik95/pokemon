import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Segment, Icon, Table } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPokemon,
  selectPokemonDetails,
  fetchPokemonDetails,
} from "./details-slice";
import { selectIsPokemonCaught } from "../search/search-slice";
import { PokemonActionButton } from "../pokemon-action-button/PokemonActionButton";

import "./PokemonDetails.css";

const capitalize = (text) => {
  const firstLetterUpperCase = text[0].toUpperCase();
  const capitalizedText = firstLetterUpperCase + text.slice(1);
  return capitalizedText;
};

const attributesToShow = {
  name: { label: "Name", getter: (details) => capitalize(details.name) },
  weight: { label: "Weight", getter: (details) => details.weight },
  height: { label: "Height", getter: (details) => details.height },
  status: { label: "Status", getter: () => "-" },
  abilities: {
    label: "Abilities",
    getter: (details) =>
      details.abilities
        .filter((ability) => !ability.is_hidden)
        .map((ability) => ability.ability.name)
        .join(", "),
  },
};

const displayedImage = "front_default";

export const PokemonDetails = () => {
  const history = useHistory();
  const selectedPokemon = useSelector(selectPokemon);
  const pokemonDetails = useSelector(selectPokemonDetails);
  const pokemonCaught = useSelector(selectIsPokemonCaught(selectedPokemon));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonDetails());
  }, []);

  const backLink = (
    <span
      onClick={() => {
        history.push("/");
      }}
    >
      <Icon name="arrow left" />
      Back to search
    </span>
  );

  const pokemonImage = pokemonDetails.sprites ? (
    <img
      className={`pokemonImage ${
        pokemonCaught ? "yellowBorder" : "blueBorder"
      }`}
      src={pokemonDetails.sprites[displayedImage]}
    />
  ) : null;

  const detailsTable = pokemonDetails.name ? (
    <Table basic="very">
      <Table.Body>
        {Object.keys(attributesToShow).map((attribute) => (
          <Table.Row>
            <Table.Cell>{attributesToShow[attribute].label}</Table.Cell>
            <Table.Cell>
              {attributesToShow[attribute].getter(pokemonDetails)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ) : null;

  return (
    <>
      <Grid stackable columns={2} id="pokemonAppContainer">
        <Grid.Column>
          <Segment id="pokemonImageSegment">
            {backLink}
            {pokemonImage}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment id="pokemonDetailsSegment">
            {detailsTable}
            <PokemonActionButton
              pokemon={{ name: selectedPokemon, caught: pokemonCaught }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};
