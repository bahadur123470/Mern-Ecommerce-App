import React, { useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UploadCloudIcon } from 'lucide-react'

const ProductImageUpload = (imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl) => {
    const inputRef = useRef(null)
    function handleImageFileChange(event){
        console.log(event.target.files)      
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
    }
    return (
        <div className='w-full max-w-md mx-auto'>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div>
                <Input 
                id='image-upload' 
                type='file' 
                className='hidden'r
                ef={inputRef} 
                onChange={handleImageFileChange} />
                {
                    !imageFile ?
                    <Label htmlFor="image-upload" className='flex flex-col items-center h-32 cursor-pointer'>
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2 '/>
                        <span>Drag & drop or click to upload image</span>
                    </Label> : 
                    <div></div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload
