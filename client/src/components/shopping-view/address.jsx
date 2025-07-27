import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from '@/store/shop/address-slice'
import AddressCard from './address-card'
import { toast } from 'sonner'

const initialAddressFormData = {
    address: '',
    city: '',
    pincode: '',
    phone: '',
    note: '',
}
const Address = ({setCurrentSelectedAddress, selectedId}) => {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const  dispatch = useDispatch()
    const { user } = useSelector(state=> state.auth)
    const { addressList } = useSelector(state=> state.shopAddress)

    function handleManageAddress(event){
        event.preventDefault();

        if(addressList.length >= 3 && currentEditedId === null ){
            setFormData(initialAddressFormData)
            toast({
                title: 'You can add only 3 addresses',
                variant: 'destructive' 
            })
            return;
        }

        currentEditedId !== null ? dispatch(editAddress({
            userId: user?.id, addressId: currentEditedId, formData
        })).then((data)=> {
            if(data?.payload.success){
                dispatch(fetchAllAddresses(user?.id))
                setCurrentEditedId(null)
                setFormData(initialAddressFormData)
                toast({
                    title: 'Address Updated Successfully',
                })
            }
        }) : dispatch(addNewAddress({
            ...formData,
            userId: user?.id
        })).then(data=>{
            if(data?.payload.success){
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initialAddressFormData)
                toast({
                    title: 'Address Added Successfully',
                })
            }
        })
    }

    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress._id}))
        .then(data=> {
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                toast({
                    title: 'Address Deleted Successfully',
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress){
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            pincode: getCurrentAddress?.pincode,
            phone: getCurrentAddress?.phone,
            note: getCurrentAddress?.note,
        })
    }

    function isFormValid(){
        return Object.keys(formData)
        .map(key=> formData[key].trim() !== '')
        .every(item=> item)
    }

    useEffect(()=>{
        dispatch(fetchAllAddresses(user?.id))
    })
    console.log(addressList, "addressList")
    return (
        <Card>
            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2'>
                {
                    addressList && addressList.length > 0 ?
                    addressList.map((singleAddressItem)=> (
                    <AddressCard 
                    selectedId={selectedId}
                    handleDeleteAddress={handleDeleteAddress} 
                    addressInfo={singleAddressItem}
                    handleEditAddress={handleEditAddress}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    />)) : null
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId !== null ? 'Edit Address' : 'Add New Address'
                    }
                </CardTitle>
                <CardContent className="space-y-3">
                    <CommonForm 
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                    />
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default Address
