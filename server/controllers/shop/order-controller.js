import Order from '../../models/order.js'
import Cart from '../../models/cart.js'
import stripe from '../../helper/stripe.js'

export const createOrder = async (req, res)=>{
    try{
        const {
            userId,
            cartId,
            cartItems, 
            addressInfo, 
            orderStatus, 
            paymentMethod, 
            paymentStatus, 
            totalAmount, 
            orderDate, 
            orderUpdateDate, 
            paymentId, 
            payerId
        } = req.body;
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: ' http://localhost:5173/shop/---return',
                cancel_url: 'http://localhost:5173/shop/---cancel'
            },
            transaction : [
                {
                    item_list: {
                        items: cartItems.map(item=> ({
                            name: item.title,
                            sku: item._id,
                            price: item.price.ToFixed(2),
                            currency: 'USD',
                            quantity: item.quantity 
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'This is the payment description'
                }
            ]
        }
        stripe.payment.create(create_payment_json, async(error, paymentInfo))
            if(error){
                console.log(error)
                return res.status(400).json({
                    success: false,
                    message: 'Error creating payment'
                })
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems, 
                    addressInfo, 
                    orderStatus, 
                    paymentMethod, 
                    paymentStatus, 
                    totalAmount, 
                    orderDate, 
                    orderUpdateDate, 
                    paymentId, 
                    payerId
                })
                await newlyCreatedOrder.save()
                const approvalURL = paymentInfo.links.find(link=> link.rel === 'approval_url').href;
                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error creating order'
        })
    }
}

export const capturePayment = async (req, res)=>{
    try{
        const {paymentId, payerId, orderId} = req.body
        let order = await Order.findById(orderId)
        if(!orderId){
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }
        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        const getCardId = order.cartId;
        await Cart.findByIdAndDelete(getCardId)

        await order.save();
        res.status(200).json({
            success: true,
            message: 'Order confirmed',
            data: order,
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error creating order'
        })
    }
}

export const getAllOrdersByUser =  async (req, res)=> {
    try{
        const {userId} = req.params
        const orders =  await Order.find(userId)
        if(!orders.length){
            return res.status(404).json({
                success: false,
                message: "No orders found!"
            })
        }
        res.status(200).json({
            success: true,
            data: orders 
            })
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error getting orders'
            })
    }
}

export const getOrderDetails =  async (req, res)=> {
    try{
        const {id} = req.params 
        const order =  await Order.findById(id)
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error getting orders'
            })
    }
}