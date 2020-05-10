import React from "react";
import { Segment } from "semantic-ui-react";

export const PokemonInfoHeader = () => {
  return (
    <Segment.Group className="pokemonHeaderSegmentGroup" horizontal>
      <Segment className="pokemonHeaderSegment">Name</Segment>
      <Segment className="pokemonHeaderSegment">Type</Segment>
      <Segment className="pokemonHeaderSegment">Status</Segment>
    </Segment.Group>
  );
};
