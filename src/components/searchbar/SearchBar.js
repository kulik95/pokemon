import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { updateFilter } from '../search/search-slice';

export const SearchBar = () => {
    const [isMouseHovering, setIsMouseHovering] = useState(false);
    const dispatch = useDispatch();
    return <Input onChange={(event, data) => { console.log(data); dispatch(updateFilter({ searchExpression: data.value })); }} focus={isMouseHovering} onMouseLeave={() => setIsMouseHovering(false)} onMouseEnter={() => setIsMouseHovering(true)} fluid icon='search' iconPosition='left' />
};