import { ImageUploadUtil } from '../../helper/cloudinary.js';
import Product from '../../models/products.js';
import mongoose from 'mongoose';

export const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64; // ← FIXED: missing comma after 'base64'
        const result = await ImageUploadUtil(url);

        res.json({
        success: true,
        result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Image upload failed',
        });
    }
};
export const addProduct = async (req, res) => {
    try {
        const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        } = req.body;

        const newProduct = new Product({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        });

    await newProduct.save();

        res.status(201).json({
        success: true,
        data: newProduct,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
        success: false,
        message: 'Failed to create product',
        });
    }
};
export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
        success: true,
        data: products,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        });
    }
};
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        } = req.body;

        let findProduct = await Product.findById(id);
        if (!findProduct) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
        }

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? 0 :  price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await product.save();

        res.status(200).json({
        success: true,
        data: product,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
        success: false,
        message: 'Failed to update product',
        });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
        success: false,
        message: 'Failed to delete product',
        });
    }
};
