import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FAKE_STORE_URL } from "../../database/api"
import axios from "axios"




export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${FAKE_STORE_URL}/categories`)
            return res.data

        } catch (err) {
            console.error(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
            state.isLoaded = false
        })
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.list = payload
            state.isLoading = false
            state.isLoaded = true
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
            state.isLoaded = false
            console.error('categoriesSlice Error: ')
        })
    }
})

export default categoriesSlice.reducer