import Address from '../../models/address.js'


export const addAddress = async (req, res)=>{
    try{
        const {userId, address, city, pincode, phone, notes} = req.body
        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            })
        }
        const newlyCreatedAddress = new Address({
            userId, address, city, pincode, phone, notes
        })
        await newlyCreatedAddress.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedAddress
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Error adding address'
        })
    }
}

export const fetchAllAddress = async (req, res)=>{
    try{
        const { userId } =  req.params;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "Invalid user id provided!"
            })
        }
        const addressList =  await addAddress.find({userId})
        return res.status(200).json({
            success: true,
            data: addressList
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Error adding address'
        })
    }
}

export const editAddress = async (req, res)=>{
    try{
        const {userId, addressId} = req.params;
        const formData = req.body
        if(!userId || !addressId){
            return res.status(400).json({
                success: false,
                message: "Invalid user id or address id provided!"
            })
        }
        const updatedAddress =  await Address.findOneAndUpdate({
            _id: addressId, userId 
        }, 
        formData, {new: true}
        )
        if(!updatedAddress){
            return res.status(404).json({
                success: false,
                message: "Address not found!"
            })
        }
        return res.status(200).json({
            success: true,
            data: updatedAddress
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Error adding address'
        })
    }
}

export const deleteAddress = async (req, res)=>{
    try{
        const {userId, addressId} = req.params;
        if(!userId || !addressId){
            return res.status(400).json({
                success: false,
                message: "Invalid user id or address id provided!"
            })
        }
        const address = await Address.findOneAndDelete({_id : addressId, userId})
        if(!address){
            return res.status(404).json({
                success: false,
                message: "Address not found!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Address deleted successfully!"
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Error adding address'
        })
    }
}