import Feature from "../../models/feature.js";

export const addFeatureImages = async (req, res)=> {
    try{
        const {image} = req.body;
        const featureImages = new Feature({image})
        await featureImages.save();
        res.status(201).json({
            success: true,
            data: featureImages,
            message: "Feature images added successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding feature images"
        })
    }
}

export const getFeatureImages = async (req, res)=> {
    try{
        const images = await Feature.find();
        res.status(200).json({
            success: true,
            data: images,
            message: "Feature images fetched successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding feature images"
        })
    }
}