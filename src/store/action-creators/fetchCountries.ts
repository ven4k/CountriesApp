import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiData } from "../favoritesSlice"


export const fetchCountries = createAsyncThunk<ApiData[], undefined, { rejectValue: string }>(
    'countries/fetchCountries',
    async (_, { rejectWithValue }) => {
        const response = await fetch('https://restcountries.com/v3.1/all')
        if (!response.ok) {
            return rejectWithValue('An error occurred while loading the data...')
        }
        return await response.json() as ApiData[];
    }
)

