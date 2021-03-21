import React from 'react';
//import styled from '@emotion/styled';
import { useParams } from 'react-router';

import { Player, Players } from '../../features/players';

type ParamsType = {
    id: string
}

const PlayersView = (): JSX.Element => {
    const { id }: ParamsType = useParams();
    const [playerID, setPlayerID] = React.useState(id ? parseInt(id) : 0);

    const handleIdChange = (event: React.SyntheticEvent): void => {
        if (event.target) {
            setPlayerID(parseInt((event.target as HTMLInputElement).value));
        }
    }

    return (
        <div>
            <h1>Joueurs</h1>
            <form>
                <label>ID du joueur
                    <input type="number" value={playerID} onChange={handleIdChange} />
                </label>
            </form>
            {
                playerID != 0 ? <Player id={playerID} /> : <Players />
            }
        </div>
    );
}

export default PlayersView;