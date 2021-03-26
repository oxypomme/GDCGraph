import React from 'react';
import styled from '@emotion/styled';

import Select from 'react-select';

import { fetchPlayerList, selectPlayerList } from '@/app/reducers/playerSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const Search = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > label {
        display: flex;
        flex-direction: column;
        width: max-content;
        text-align: left;
        & > * {
            margin: 5px 0 10px 0;
            & > div:first-of-type {
                border-radius: 5px 5px 0 0;
                border: 0;
                border-bottom: 1px solid var(--text);
                transition: .1s background;
            }
        }
    }
`;

interface ISelectItem {
    name: string,
    value: number,
    label: string
}

type PropsType = {
    setPlayer: React.Dispatch<React.SetStateAction<string>>
}

const SearchPlayer = (props: PropsType): JSX.Element => {
    const { setPlayer } = props;
    const dispatch = useAppDispatch();

    const players = useAppSelector(selectPlayerList)

    const [playersItems, setPlayersItems] = React.useState<ISelectItem[]>(new Array(0));

    const handlePlayerChange = (elmnt: ISelectItem | null): void => {
        if (elmnt) {
            if (elmnt.value > 0) {
                setPlayer(elmnt.value.toString());
            } else {
                dispatch(fetchPlayerList());
            }
        }
    }

    React.useEffect(() => {
        if (players.length > 0) {
            setPlayersItems(players.map(p => ({ name: p.name, value: p.id, label: `${p.name} - ${p.id}` })));
        } else {
            setPlayersItems([{ name: "", value: -1, label: "Récupérer joueurs" }]);
        }
    }, [players]);

    return (
        <Search>
            <label>Nom ou # du joueur :
                <Select options={playersItems} onChange={handlePlayerChange} />
            </label>
        </Search>
    );
}

export default SearchPlayer;