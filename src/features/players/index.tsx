import React from 'react';
import styled from '@emotion/styled';

import PlayerDetail from "./Player";
import AllPlayers from "./Players";
import { HSeparator } from '@/components';
import SearchPlayer from './SearchPlayer';

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

type PropsType = {
    playerID: string
}

const Player = (props: PropsType): JSX.Element => {
    const { playerID } = props;

    const [player, setPlayer] = React.useState(playerID);

    return (
        <Flex>
            <SearchPlayer setPlayer={setPlayer} />
            <HSeparator width={"50%"} />
            {
                player ? <PlayerDetail id={player} /> : <AllPlayers />
            }
        </Flex>
    );
}

export default Player;