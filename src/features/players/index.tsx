import React from 'react';
import styled from '@emotion/styled';

import PlayerDetail from "./Player";
import AllPlayers from "./Players";

const Search = styled.div`
    display: flex;
    flex-direction: column;
`;

type PropsType = {
    playerID: string
}

const Component = (props: PropsType): JSX.Element => {
    const { playerID } = props;

    const [playerText, setPlayerText] = React.useState(playerID);
    const [player, setPlayer] = React.useState(playerID);

    const handleNameChange = (event: React.SyntheticEvent): void => {
        setPlayerText((event.target as HTMLInputElement).value);
    }

    const handleNameBlur = (event: React.SyntheticEvent): void => {
        setPlayer((event.target as HTMLInputElement).value)
    }

    return (
        <div>
            <Search>
                <label>Nom du joueur
                    <input type="text" value={playerText} onChange={handleNameChange} onBlur={handleNameBlur} />
                </label>
            </Search>
            {
                player ? <PlayerDetail id={player} /> : <AllPlayers />
            }
        </div>
    );
}

export default Component;