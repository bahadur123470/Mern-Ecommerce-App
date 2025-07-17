import axios from "axios";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    cartItem: [],
    isLoading: false,
}


export const addToCart = createAsyncThunk(
    'cart/addToCart', 
    async({userId, productId, quantity}) => {
    const response = await axios.post("http://localhost:5000/api/shop/cart/add/", {
        userId, productId, quantity
    });
    return response.data; 
})

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems', 
    async({userId}) => {
    const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
    return response.data; 
})

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity', 
    async({userId, productId, quantity}) => {
    const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart", {
        userId, productId, quantity
    });
    return response.data; 
})

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem', 
    async({userId, productId}) => {
    const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
    return response.data; 
})


const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(addToCart.pending, (state)=>{
            state.isLoading = true
        }).addCase(addToCart.fulfilled, (state, action)=>{
            state.isLoading = false
            state.cartItem = action.payload.data
        }).addCase(addToCart.rejected, (state)=>{
            state.isLoading = false
            state.cartItem = []
        })
        .addCase(fetchCartItems.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled, (state, action)=>{
            state.isLoading = false
            state.cartItem = action.payload.data
        }).addCase(fetchCartItems.rejected, (state)=>{
            state.isLoading = false
            state.cartItem = []
        })
        .addCase(updateCartItemQuantity.pending, (state)=>{
            state.isLoading = true
        }).addCase(updateCartItemQuantity.fulfilled, (state, action)=>{
            state.isLoading = false
            state.cartItem = action.payload.data
        }).addCase(updateCartItemQuantity.rejected, (state)=>{
            state.isLoading = false
            state.cartItem = []
        })
        .addCase(deleteCartItem.pending, (state)=>{
            state.isLoading = true
        }).addCase(deleteCartItem.fulfilled, (state, action)=>{
            state.isLoading = false
            state.cartItem = action.payload.data
        }).addCase(deleteCartItem.rejected, (state)=>{
            state.isLoading = false
            state.cartItem = []
        })
    }
})
export default shoppingCartSlice.reducer;