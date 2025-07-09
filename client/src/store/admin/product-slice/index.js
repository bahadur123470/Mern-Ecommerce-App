import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
};

export const addNewProduct = createAsyncThunk(
    "/products/addNewProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const result = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get('http://localhost:5000/api/admin/products/get');
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
                console.error("Error fetching products:", action.payload);
            });
    },
});

export default adminProductsSlice.reducer;
