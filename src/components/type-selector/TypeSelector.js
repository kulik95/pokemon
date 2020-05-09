import React, { useEffect, useState } from 'react';
import { fetchPokemonTypes } from '../../utils/pokemon-api';
import { Dropdown } from 'semantic-ui-react';
import './TypeSelector.css';

const placeholderText = 'Select...';

const getDropdownItemClass = index => {
    return index % 2 === 0 ? 'even' : '';
};

export const TypeSelector = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetchPokemonTypes().then(pokemonTypes => setTypes(pokemonTypes));
    }, []);

    const pokemonTypeOptions = types.map((type, index) => ({
        key: type.url,
        text: type.name,
        value: type.url,
        className: getDropdownItemClass(index),
        active: false
    }));

    return <>
        <Dropdown
            id='typesDropdown'
            placeholder={placeholderText}
            fluid
            selection
            selectOnBlur={false}
            options={pokemonTypeOptions}
        /></>
};