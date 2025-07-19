import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'

const initialFormData = {
    status: '',
}

const AdminOrderDetailsView = () => {

    const [formData, setFormData] = useState(initialFormData)
    function handleUpdateStatus(event){
        event.preventDefault()
    }

    return (
            <DialogContent className="sm:max-w-[600px]">
                <div className='grid gap-6'>
                    <div className='grid- gap-2'>
                        <div className='flex items-center justify-center mt-6'>
                            <p className='font-medium'>Order ID</p>
                            <Label>12345</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Order Date</p>
                            <Label>18/07/2025</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Order Price</p>
                            <Label>$120</Label>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                            <p className='font-medium'>Order Status</p>
                            <Label>Delivered</Label>
                        </div>
                    </div>
                    <Separator/>
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            <div className='font-medium'>Order Details</div>
                            <ul className='grid gap-3'>
                                <li className='flex items-center justify-center'>
                                    <span>Product One</span>
                                    <span>$100</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                        <div className='font-medium'>Shipping Info</div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span>Harry Brook</span>
                            <span>Address</span>
                            <span>City</span>
                            <span>Pincode</span>
                            <span>Phone</span>
                            <span>Notes</span>
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
