import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPokemon,
  selectPokemonDetails,
  fetchPokemonDetails,
} from "./details-slice";
import { selectIsPokemonCaught } from "../search/search-slice";

import "./PokemonDetails.css";

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

  return (
    <>
      {backLink}
      <Grid stackable columns={2} id="pokemonAppContainer">
        <Grid.Column>
          <Segment id="pokemonImageSegment">{pokemonImage}</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment id="pokemonDetailsSegment">
            <span>{selectedPokemon}</span>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};
