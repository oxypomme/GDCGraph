import { configureStore, Store } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export default (): Store => {
    const store = configureStore({
        reducer: rootReducer
    });
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }
    return store;
};