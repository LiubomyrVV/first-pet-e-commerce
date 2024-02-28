import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FAKE_STORE_URL } from "../../database/api"
import axios from "axios"




export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${FAKE_STORE_URL}`)
            return res.data

        } catch (err) {
            console.error(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)


const productsSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        // filtered: [],
        // related: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
            state.isLoaded = false
        })
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.list = payload
            state.isLoading = false
            state.isLoaded = true
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false
            state.isLoaded = false
            console.error('productsSlice Error: ')
        })
    }
})

export default productsSlice.reducer