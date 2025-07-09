import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'


cloudinary.config({
    cloud_name: 'dgtglyawh',
    api_key: '984738634945856',
    api_secret: 'CzWFTg67wJrQhaI5vyt4kSD_aTc',
});

const storage = new multer.memoryStorage();
async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })
    return result
}
const upload = multer({storage});

export {upload, ImageUploadUtil}

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

