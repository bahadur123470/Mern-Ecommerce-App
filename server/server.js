import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'; 
import authRouter from './routes/auth/auth-routes.js';
import adminProductsRouter from './routes/admin/products-routes.js'
import adminOrderRouter from './routes/admin/order-routes.js'
import shopProductsRouter from './routes/shop/products-routes.js'
import shopCartRouter from './routes/shop/cart-routes.js'
import shopAddressRouter from './routes/shop/address-routes.js'
import shopOrderRouter from './routes/shop/order-routes.js'
import shopSearchRouter from './routes/shop/search-routes.js'

mongoose.connect('mongodb+srv://bahadurali123470:dbPassword@cluster0.zeddx1i.mongodb.net/')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api/admin/products", adminProductsRouter)
app.use("/api/admin/orders", adminOrderRouter)
app.use("/api/shop/products", shopProductsRouter)
app.use("/api/shop/cart", shopCartRouter)
app.use("/api/shop/address", shopAddressRouter)
app.use("/api/shop/order", shopOrderRouter)
app.use("/api/shop/search", shopSearchRouter)

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));