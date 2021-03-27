import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

import { url as urlAPI } from '@config/gdcapi.json';
import urljoin from 'url-join';

import IMapType from "@/models/IMapType";

export const fetchMapList = createAsyncThunk(
    'maps/fetchMapList',
    async () => await (await fetch(urljoin(urlAPI, '/maps'))).json()
);

interface MapsState {
    mapList: IMapType[],
    isFetching: boolean
}

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        mapList: [],
        isFetching: false
    } as MapsState,
    extraReducers: {
        [fetchMapList.pending.type]: (state) => ({
            ...state,
            isFetching: true
        }),
        [fetchMapList.fulfilled.type]: (state, { payload: mapList }: PayloadAction<IMapType[]>): MapsState => ({
            ...state,
            mapList,
            isFetching: false
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [fetchMapList.rejected.type]: (state, { error }: any) => {
            console.error(error);
            return {
                ...state,
                isFetching: false
            }
        },
    },
    reducers: {}
});

const getState = (state: RootState): MapsState => state.map;

export const selectMapList = createSelector(getState, state => state.mapList);
export const selectMapFetching = createSelector(getState, state => state.isFetching);

export default mapSlice.reducer;