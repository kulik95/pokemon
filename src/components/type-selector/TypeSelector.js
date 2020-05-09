import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTypes, fetchTypes } from './typeSlice';
import { Dropdown } from 'semantic-ui-react';
import './TypeSelector.css';

const placeholderText = 'Select...';

const getDropdownItemClass = index => {
    return index % 2 === 0 ? 'even' : '';
};

export const TypeSelector = () => {
    const types = useSelector(selectTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTypes(dispatch);
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