import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootReducers from "./slices";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store