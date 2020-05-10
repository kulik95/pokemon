import React from "react";
import { useHistory } from "react-router-dom";

export const PokemonDetails = () => {
  const history = useHistory();
  return (
    <>
      <span
        onClick={() => {
          history.push("/");
        }}
      >
        Back to search
      </span>
      <span>Pokemon Details</span>
    </>
  );
};
