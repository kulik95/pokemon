import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../search/search-slice';

export const CaughtToggle = () => {
    const dispatch = useDispatch();
    return <Checkbox onClick={(event, data) => { dispatch(updateFilter({ caughtOnly: !!data.checked })); }} label='Show caught pokemons only' />
};