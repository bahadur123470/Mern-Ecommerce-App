import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/order-slice'
import { toast } from 'sonner'

const initialFormData = {
    status: '',
}

const AdminOrderDetailsView = ({orderDetails}) => {

    const [formData, setFormData] = useState(initialFormData)
    const { user } = useSelector(state=> state.auth)
    const dispatch = useDispatch()

    function handleUpdateStatus(event){
        event.preventDefault()
        console.log(formData)
        const { status } = formData 
        dispatch(updateOrderStatus(
            {id: orderDetails?._id, orderStatus: status})).then(data=> {
                if(data?.payload?.success){
                    dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                    dispatch(getAllOrdersForAdmin())
                    setFormData(initialFormData)
                    toast({
                        title: data?.payload?.message
                    })
                }
            })
    }

    return (
            <DialogContent className="sm:max-w-[600px]">
                <div className='grid gap-6'>
                    <div className='grid- gap-2'>
                        <div className='flex items-center justify-center mt-6'>
                            <p className='font-medium'>Order ID</p>
                            <Label>{orderDetails?._id}</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Order Date</p>
                            <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Order Price</p>
                            <Label>${orderDetails?.totalAmount}</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Payment Method</p>
                            <Label>{orderDetails?.paymentMethod}</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Payment Status</p>
                            <Label>{orderDetails?.paymentStatus}</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Order Status</p>
                            <Label>
                                <Badge className={`py-1 px-3 
                                    ${orderDetails?.orderStatus === 'confirmed' 
                                    ? 'bg-green-500' 
                                    : orderDetails?.orderStatus === 'rejected' 
                                    ? 'bg-red-600' 
                                    : 'bg-black'}`}>
                                        {orderDetails?.orderStatus}
                                </Badge>
                            </Label>
                        </div>
                    </div>
                    <Separator/>
                    <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Order Details</div>
                    <ul className='grid gap-3'>
                        {
                            orderDetails?.cartItem && orderDetails?.cartItem.length > 0 ?
                            orderDetails?.cartItem.map(item=>
                            <li className='flex items-center justify-center'>
                                <span>Title: {item.title}</span>
                                <span>Quantity: {item.quantity}</span>
                                <span>Price: ${item.price}</span>
                            </li>
                            ) : null
                        }
                    </ul>
                </div>
            </div>
            <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Shipping Info</div>
                    <div className='grid gap-0.5 text-muted-foreground'>
                        <span>{user.userName}</span>
                        <span>{orderDetails?.addressInfo?.address}</span>
                        <span>{orderDetails?.addressInfo?.city}</span>
                        <span>{orderDetails?.addressInfo?.pincode}</span>
                        <span>{orderDetails?.addressInfo?.phone}</span>
                        <span>{orderDetails?.addressInfo?.notes}</span>
                    </div>
                </div>
            </div>

                    <div>
                        <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping " },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                ],
                                },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={'Update order status'}
                        onSubmit={handleUpdateStatus}
                        />
                    </div>
                </div>
            </DialogContent>
    )
}

export default AdminOrderDetailsView
