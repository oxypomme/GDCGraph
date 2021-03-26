import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router';

import Player from '../../features/players';

const Title = styled.h1`
    visibility: hidden;
    margin: 0;
`;

type ParamsType = {
    id: string
}

const PlayersView = (): JSX.Element => {
    const { id }: ParamsType = useParams();

    return (
        <div>
            <Title>Joueurs</Title>
            <Player playerID={id} />
        </div>
    );
}

export default PlayersView;