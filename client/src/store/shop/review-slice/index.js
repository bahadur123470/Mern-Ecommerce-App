import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    isLoading : false,
    reviews: [],
}

export const addReview = createAsyncThunk(
    '/order/addReview', 
    async(formdata)=>{
    const response = await axios.post(`http://localhost:5000/api/shop/review/add`, formdata);
    return response.data;
})

export const getReviews = createAsyncThunk(
    '/order/getReviews', 
    async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/shop/review/${id}`);
    return response.data;
})

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers :{
        resetSearchResults:(state)=>{
            state.searchResults = [];
        }
    },
    extraReducers: (builder)=> {
        builder
        // .addCase(addReview.pending, (state)=> {
        //     state.isLoading = true;
        // }).addCase(addReview.fulfilled, (state, action)=> {
        //     state.isLoading = false;
        //     state.reviews = action.payload.data;
        // }).addCase(addReview.rejected, (state)=> {
        //     state.isLoading = false;
        //     state.reviews = [];
        // })
        .addCase(getReviews.pending, (state)=> {
            state.isLoading = true;
        }).addCase(getReviews.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.searchResults = action.payload.data;
        }).addCase(getReviews.rejected, (state)=> {
            state.isLoading = false;
            state.searchResults = [];
        })
    }
})

export default reviewSlice.reducer;