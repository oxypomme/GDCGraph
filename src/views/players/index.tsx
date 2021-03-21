import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router';

import urljoin from 'url-join';

import { Player, Players } from '../../features/players';
import { url as urlAPI } from '../../config/gdcapi.json';

const Search = styled.form`
    display: flex;
    flex-direction: column;
`;

type ParamsType = {
    id: string
}

const PlayersView = (): JSX.Element => {
    const { id }: ParamsType = useParams();
    const [playerID, setPlayerID] = React.useState(id ? parseInt(id) : 0);
    const [playerName, setPlayerName] = React.useState(id && !parseInt(id) ? id : "");

    const handleIdChange = (event: React.SyntheticEvent): void => {
        if (event.target) {
            setPlayerID(parseInt((event.target as HTMLInputElement).value));
        }
    }

    const handleIdFetch = async (event: React.SyntheticEvent) => {
        const name = (await (await fetch(urljoin(urlAPI, `/players/id/${parseInt((event.target as HTMLInputElement).value)}`))).json()).name;
        setPlayerName(name === null ? 0 : name);
    }

    const handleNameChange = (event: React.SyntheticEvent): void => {
        if (event.target) {
            setPlayerName((event.target as HTMLInputElement).value);
        }
    }

    const handleNameFetch = async (event: React.SyntheticEvent) => {
        const id = (await (await fetch(urljoin(urlAPI, `/players/name/${(event.target as HTMLInputElement).value}`))).json()).id;
        setPlayerID(id === null ? 0 : id);
    }

    return (
        <div>
            <h1>Joueurs</h1>
            <Search>
                <label>ID du joueur
                    <input type="number" value={playerID} onChange={handleIdChange} onBlur={handleIdFetch} />
                </label>
                <label>Nom du joueur
                    <input type="text" value={playerName} onChange={handleNameChange} onBlur={handleNameFetch} />
                </label>
            </Search>
            {
                playerID ? <Player id={playerID} /> : <Players />
            }
        </div>
    );
}

export default PlayersView;