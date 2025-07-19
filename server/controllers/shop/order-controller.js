import Order from '../../models/order.js'
import stripe from '../../helper/stripe.js'

export const createOrder = async (req, res)=>{
    try{
        const {
            userId,
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
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error creating order'
        })
    }
}