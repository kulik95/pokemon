import React from 'react';
import { SearchBar } from '../searchbar/SearchBar';
import { TypeSelector } from '../type-selector/TypeSelector';
import { CaughtToggle } from '../caught-toggle/CaughtToggle';


export const Search = () => {
    return <>
        <SearchBar />
        <TypeSelector />
        <CaughtToggle />
    </>
};