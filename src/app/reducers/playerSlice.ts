import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

import { url as urlAPI } from '@config/gdcapi.json';
import urljoin from 'url-join';

import IPlayerType, { IPlayersType } from '@/models/IPlayerType'
import MissionType from '@/models/MissionType';

// Define a type for the slice state
interface PlayerState {
    playerList: IPlayersType[],
    players: PlayerDetailType[],
    lastFetchIndex: number,
    isFetching: boolean
}

export interface PlayerDetailType {
    infos: IPlayerType,
    missions: Array<MissionType>
}

export const fetchPlayerList = createAsyncThunk(
    'player/fetchPlayerList',
    async () => await (await fetch(urljoin(urlAPI, '/players'))).json()
);
export const fetchPlayer = createAsyncThunk(
    'player/fetchPlayer',
    async (id: string) => {
        let pId = id;
        if (!parseInt(id)) {
            pId = (await (await fetch(urljoin(urlAPI, `/players/name/${id}`))).json()).id;
        }
        return await (await fetch(urljoin(urlAPI, `/players/${pId}`))).json();
    }
);

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        playerList: [],
        players: [],
        lastFetchIndex: -1,
        isFetching: false
    } as PlayerState,
    extraReducers: {
        [fetchPlayerList.pending.type]: (state) => ({
            ...state,
            isFetching: true
        }),
        [fetchPlayer.pending.type]: (state) => ({
            ...state,
            isFetching: true
        }),
        [fetchPlayerList.fulfilled.type]: (state, { payload: playerList }: PayloadAction<IPlayersType[]>): PlayerState => ({
            ...state,
            playerList,
            isFetching: false
        }),
        [fetchPlayer.fulfilled.type]: (state, { payload: player }: PayloadAction<PlayerDetailType>): PlayerState => {
            let players = [...state.players];
            let lastFetchIndex = players.findIndex(val => val.infos.id == player.infos.id);

            if (lastFetchIndex === -1) {
                lastFetchIndex = players.length;
                players = [...players, player];
            }
            return {
                ...state,
                players,
                lastFetchIndex,
                isFetching: false
            }
        },
    },
    reducers: {}
});

const getState = (state: RootState): PlayerState => state.player;

export const selectPlayerList = createSelector(getState, state => state.playerList);
export const selectPlayer = createSelector(getState, state => state.players[state.lastFetchIndex]);
export const selectPlayerFetching = createSelector(getState, state => state.isFetching);

export default playerSlice.reducer;