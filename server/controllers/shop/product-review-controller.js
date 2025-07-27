import ProductReview from "../../models/review.js";
import Product from "../../models/products.js";
import Order from "../../models/order.js";

export const addProductReviews =  async (req, res)=> {
    try{
        const {productId, userId, userName, reviewMessage, reviewValue} = req.body;
        const order = await Order.findOne({
            userId,
            'cartItems.productId' : productId,
            orderStatus: 'confirmed'
        })
        if(!order){
            return res.status(403).json({
                success: false,
                message: 'You can only review products you have purchased'
            })
        }
        const checkExistingReview = await ProductReview.findOne({productId, userId})
        if(checkExistingReview){
            return res.status(403).json({
                success: false,
                message: 'You have already reviewed this product'
            })
        }
        const newReview = await ProductReview.create({
            productId, userId, userName, reviewMessage, reviewValue
        })
        await newReview.save();

        const reviews = await ProductReview.find({productId});
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem)=> sum + reviewItem.reviewValue, 0) / totalReviewsLength;
        await Product.findByIdAndUpdate(productId, {averageReview})
        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: newReview
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        })
    }
}

export const getProductReviews =  async (req, res)=> {
    try{
        const {productId} = req.params;
        const reviews = await ProductReview.find({productId});
        res.status(200).json({
            success: true,
            message: 'Review added successfully',
            data: reviews
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        })
    }
}