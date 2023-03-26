import { configureStore } from '@reduxjs/toolkit'
import { favoriteSlice } from './favoritesSlice'

export const store = configureStore({
  reducer: {
    countriesList: favoriteSlice.reducer,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch