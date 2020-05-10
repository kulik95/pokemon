import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTypes, fetchTypes } from "./typeSlice";
import {
  fetchPokemonsForType,
  fetchAllPokemonsByType,
} from "../search/search-slice";
import { Dropdown } from "semantic-ui-react";
import "./TypeSelector.css";

const placeholderText = "Select...";

const getDropdownItemClass = (index) => {
  return index % 2 === 0 ? "even" : "";
};

export const TypeSelector = () => {
  const types = useSelector(selectTypes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTypes());
  }, []);

  const pokemonTypeOptions = types.map((type, index) => ({
    key: type.url,
    text: type.name,
    value: type.url,
    className: getDropdownItemClass(index),
    active: false,
  }));

  return (
    <>
      <span>Types</span>
      <Dropdown
        id="typesDropdown"
        placeholder={placeholderText}
        fluid
        selection
        selectOnBlur={false}
        onChange={(event, data) => {
          debugger;
          dispatch(fetchAllPokemonsByType(data.value, types));
        }}
        options={pokemonTypeOptions}
      />
    </>
  );
};
