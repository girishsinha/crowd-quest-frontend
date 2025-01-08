import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../slices/authSlice';
import problemSlice from '../slices/problemSlice';
import commentSlice from '../slices/commentSlice';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ['error']
}


const persistedReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({
    auth: persistedReducer,
    problems: problemSlice,
    comments: commentSlice,
})


const store = configureStore({
    reducer: rootReducer,
    // reducer: {
    //     reducer: persistedReducer,
    //     //TODO: add more slices here for posts
    // }
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});


export default store;