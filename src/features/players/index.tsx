import React from 'react';
import styled from '@emotion/styled';

import PlayerDetail from "./Player";
import AllPlayers from "./Players";
import { HSeparator } from '@/components';

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Search = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > label {
        display: flex;
        flex-direction: column;
        width: min-content;
        text-align: left;
        & > input {
            margin: 5px 0 20px 0;
            border-radius: 5px 5px 0 0;
            border: 0;
            border-bottom: 1px solid var(--text);
            padding: 8px;
            outline: 0;
            transition: .1s background;

            &:focus{
                background: var(--background-dark);
            }
        }
    }
`;

type PropsType = {
    playerID: string
}

const Player = (props: PropsType): JSX.Element => {
    const { playerID } = props;

    const [playerText, setPlayerText] = React.useState<string>(playerID ? playerID : "");
    const [player, setPlayer] = React.useState(playerID);

    const handleNameChange = (event: React.SyntheticEvent): void => {
        setPlayerText((event.target as HTMLInputElement).value);
    }

    const handleNameBlur = (event: React.SyntheticEvent): void => {
        setPlayer((event.target as HTMLInputElement).value)
    }

    const handleKeyPress = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
            setPlayer((event.target as HTMLInputElement).value);
        }
    }

    return (
        <Flex>
            <Search>
                <label>Nom ou # du joueur :
                    <input type="text" value={playerText} onChange={handleNameChange} onBlur={handleNameBlur} onKeyPress={handleKeyPress} />
                    {/* TODO: AutoCompletion */}
                </label>
            </Search>
            <HSeparator width={"50%"} />
            {
                player ? <PlayerDetail id={player} /> : <AllPlayers />
            }
        </Flex>
    );
}

export default Player;