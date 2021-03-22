import React from 'react';
//import styled from '@emotion/styled';
import { useParams } from 'react-router';

import Player from '../../features/players';

type ParamsType = {
    id: string
}

const PlayersView = (): JSX.Element => {
    const { id }: ParamsType = useParams();

    return (
        <div>
            <h1>Joueurs</h1>
            <Player playerID={id} />
        </div>
    );
}

export default PlayersView;