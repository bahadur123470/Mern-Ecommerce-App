import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number,
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String
},
{ timestamps: true }
)

const Order = mongoose.model("Order", OrderSchema)
export default Order;  



        orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId