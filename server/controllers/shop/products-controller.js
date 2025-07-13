import Product from '../../models/products.js'


export const getFilteredProducts = async (req, res) =>{
    try{
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            data: products
        })
    }catch (e){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        })
    }
}