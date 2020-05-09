import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Search } from '../search/Search';

export const PokemonSelector = () => {
    return <Grid stackable columns={2}>
        <Grid.Column>
            <Segment>
                <Search />
            </Segment>
        </Grid.Column>
        <Grid.Column>
            <Segment>
                <span>results table</ span>
            </Segment>
        </Grid.Column>
    </Grid>
};