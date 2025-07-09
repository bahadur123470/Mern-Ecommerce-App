import React, { useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UploadCloudIcon } from 'lucide-react'

const ProductImageUpload = ({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl }) => {
    const inputRef = useRef(null)
    
    function handleImageFileChange(event){
        console.log(event.target.files)      
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
    }
    
    function handleDragOver(event) {
        event.preventDefault();
    }
    
    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }
    
    return (
        <div className='w-full max-w-md mx-auto'>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop}>
                <Input 
                    id='image-upload' 
                    type='file' 
                    className='hidden'
                    ref={inputRef} 
                    onChange={handleImageFileChange}
                    accept="image/*"
                />
                {
                    !imageFile ?
                    <Label 
                        htmlFor="image-upload" 
                        className='flex flex-col items-center justify-center h-32 cursor-pointer border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-muted-foreground/50 transition-colors'
                    >
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                        <span>Drag & drop or click to upload image</span>
                    </Label> : 
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img 
                                src={URL.createObjectURL(imageFile)} 
                                alt="Product preview" 
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => setImageFile(null)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{imageFile.name}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload
