import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCountries } from './action-creators/fetchCountries';


type strObj = { [key: string]: string }
export interface ApiData {
  name: {
    common: string,
    official: string,
  },
  cca2: string,
  cca3?: string,
  region?: string,
  languages: strObj,
  population?: number,
  timezones?: string[],
  continents?: string,
  flags: {
    png: string,
    svg: string
  },
  translations: {
    rus: {
      common: string
    }
  }
}

type initStateType = {
  countries: ApiData[],
  favorites: ApiData[],
  currentCountry: ApiData,
  loading: boolean,
  error: string | undefined | null
}
let favoriteStorage = localStorage.getItem('element');
let currentCountryStorage = localStorage.getItem('currItem');
let parsedFavoriteStorage = JSON.parse(favoriteStorage as string);
let parsedCurrentCountryStorage = JSON.parse(currentCountryStorage as string)

const initFavorites = (localStorage.getItem('element') !== null) ? parsedFavoriteStorage : []
const initCurrentCountry = (localStorage.getItem('currItem') !== null ? parsedCurrentCountryStorage : {})

const initialState: initStateType = {
  countries: [],
  favorites: initFavorites,
  currentCountry: initCurrentCountry,
  loading: false,
  error: null
}

export const favoriteSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addFavoriteList: (state, action: PayloadAction<ApiData>) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteList: (state, action: PayloadAction<ApiData>) => {
      state.favorites = state.favorites.filter(item => item.cca3 !== action.payload.cca3)
    },
    addCountries: (state, action: PayloadAction<ApiData>) => {
      state.countries.push(action.payload)
    },
    ChangeCurrentCountry: (state, action: PayloadAction<ApiData>) => {
      state.currentCountry = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.error = null
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.loading = false;
      })
  }

})


export const { addFavoriteList, removeFavoriteList, addCountries, ChangeCurrentCountry } = favoriteSlice.actions;

export default favoriteSlice.reducer