import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { TypeSelector } from '../type-selector/TypeSelector';

export const PokemonSelector = () => {
    return <Grid stackable columns={2}>
            <Grid.Column>
                <Segment>
                    <span>searchbar</ span>
                    <TypeSelector />
                    <span>caught only</ span>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>
                    <span>results table</ span>
                </Segment>
            </Grid.Column>
        </Grid>
};