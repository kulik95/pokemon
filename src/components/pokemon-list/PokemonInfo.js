import React from "react";
import { Segment } from "semantic-ui-react";

const capitalize = (text) => {
  const firstLetterUpperCase = text[0].toUpperCase();
  const capitalizedText = firstLetterUpperCase + text.slice(1);
  return capitalizedText;
};

export const PokemonInfo = (props) => {
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
