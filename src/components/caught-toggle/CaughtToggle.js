import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter, selectCaughtOnly } from '../search/search-slice';

export const CaughtToggle = () => {
    const dispatch = useDispatch();
    const caughtOnly = useSelector(selectCaughtOnly);
    return <Checkbox checked={caughtOnly} onClick={(event, data) => { dispatch(updateFilter({ caughtOnly: !!data.checked })); }} label='Show caught pokemons only' />
};