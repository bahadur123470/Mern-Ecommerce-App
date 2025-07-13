import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    error: null
};

// Thunk to fetch all filtered products
export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get('http://localhost:5000/api/shop/products/get');
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Server Error");
        }
    }
);

// Slice
const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data || []; // Assuming .data holds products
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
                state.error = action.payload;
            });
    }
});

export default shoppingProductSlice.reducer;
