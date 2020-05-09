import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';

export const SearchBar = () => {
    const [isMouseHovering, setIsMouseHovering] = useState(false);
    return <Input focus={isMouseHovering} onMouseLeave={() => setIsMouseHovering(false)} onMouseEnter={() => setIsMouseHovering(true)} fluid icon='search' iconPosition='left' />
};