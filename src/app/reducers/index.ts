import { combineReducers } from "redux";

import playerReducer from "./playerSlice";
import mapReducer from "./mapsSlice";

const reducer = combineReducers({
    player: playerReducer,
    map: mapReducer
});

export default reducer;