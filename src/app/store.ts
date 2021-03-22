import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';

const store = configureStore({
    reducer
});
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducer))
}

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
