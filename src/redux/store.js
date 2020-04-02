// Redux
import { createStore, applyMiddleware } from 'redux';
// Middleware
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// Reducers
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    blacklist: ['searchFilterResults'],
    storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);