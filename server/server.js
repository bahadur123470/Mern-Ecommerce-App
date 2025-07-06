import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'; 
import authRouter from './routes/auth/auth-routes.js';

mongoose.connect('mongodb+srv://bahadurali123470:Pass1234@cluster0.7yxddep.mongodb.net/')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: " http://localhost:5173",
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

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));