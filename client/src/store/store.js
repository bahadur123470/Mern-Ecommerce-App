import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./auth-slice/index.js"
import adminProductSlice from "./admin/product-slice/index.js"
import adminOrderSlice from "./admin/order-slice/index.js"
import shopProductsSlice from "./shop/product-slice/index.js"
import shopCartSlice from './shop/cart-slice/index.js'
import shopAddressSlice from './shop/address-slice/index.js'
import shopOrderSlice from './shop/order-slice/index.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        adminOrder: adminOrderSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice
    },
})

export default store;