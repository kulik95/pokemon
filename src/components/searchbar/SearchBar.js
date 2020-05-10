import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { updateFilter, selectSearchExpression } from '../search/search-slice';

export const SearchBar = () => {
    const [isMouseHovering, setIsMouseHovering] = useState(false);
    const dispatch = useDispatch();
    const searchExpression = useSelector(selectSearchExpression);
    return <Input value={searchExpression} onChange={(event, data) => { dispatch(updateFilter({ searchExpression: data.value })); }} focus={isMouseHovering} onMouseLeave={() => setIsMouseHovering(false)} onMouseEnter={() => setIsMouseHovering(true)} fluid icon='search' iconPosition='left' />
};