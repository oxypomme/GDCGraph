import React from 'react';
import styled from '@emotion/styled';

import Creatable from 'react-select/creatable'

import { fetchPlayerList, selectPlayerList } from '@/app/reducers/playerSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const Search = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;

    & > label {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
        & > * {
            margin: 5px 0 10px 0;
            & > div:first-of-type {
                border-radius: 5px 5px 0 0;
                border: 0;
                border-bottom: 1px solid var(--text);
            }
        }
    }
`;

interface ISelectItem {
    name: string,
    value: number | string
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
            console.log(elmnt);

            if (elmnt.value === 0) {
                dispatch(fetchPlayerList());
            } else {
                setPlayer(elmnt.value.toString());
            }
        }
    }

    React.useEffect(() => {
        if (players.length > 0) {
            setPlayersItems(players.map(p => ({ name: p.name, value: p.id })));
        } else {
            setPlayersItems([{ name: "Récuperer les joueurs", value: 0 }]);
        }
    }, [players]);

    return (
        <Search>
            <label>Joueur :
                <Creatable
                    options={playersItems}
                    onChange={handlePlayerChange}
                    components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                        Placeholder: () => null
                    }}
                    getOptionLabel={(p: ISelectItem) => `${p.value != 0 ? (typeof p.value === 'string' && !parseInt(p.value) ? p.value : `#${p.value}`) : ''}${p.value && p.name ? ' - ' : ''}${(p.name ? p.name : '')}`}
                />
            </label>
        </Search>
    );
}

export default SearchPlayer;