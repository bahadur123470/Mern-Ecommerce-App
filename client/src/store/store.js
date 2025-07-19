import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./auth-slice"
import adminProductSlice from "./admin/product-slice"
import shopProductsSlice from "./shop/product-slice"
import shopCartSlice from './shop/cart-slice/index.js'
import shopAddressSlice from './shop/address-slice/index.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice
    },
})

export default store;