import React from "react";
import { Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const capitalize = (text) => {
  const firstLetterUpperCase = text[0].toUpperCase();
  const capitalizedText = firstLetterUpperCase + text.slice(1);
  return capitalizedText;
};

export const PokemonInfo = (props) => {
  const history = useHistory();

  return (
    <Segment.Group
      className={`pokemonInfoSegmentGroup ${
        props.pokemon.caught ? "yellow" : "blue"
      }`}
      horizontal
      onClick={() => {
        history.push(`/details/${props.pokemon.name}`);
      }}
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
