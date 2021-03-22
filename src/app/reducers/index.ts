import { combineReducers } from "redux";

import playerReducer from "./playerSlice";

const reducer = combineReducers({
    player: playerReducer
});

export default reducer;