import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/app';
import treeReducer from './slices/trees';

export const store = configureStore({
  reducer: {
    app: appReducer,
    trees: treeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch