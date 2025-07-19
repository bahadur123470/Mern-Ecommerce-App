import React, { useState } from 'react'
import Img from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address'
import UserCartItemContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'

const ShoppingCheckout = () => {

    const {cartItems} = useState(state=> state.shopCart)
    console.log(cartItems);

    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ? 
    cartItems.items.reduce((sum, currentItem)=> sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0): 0

    return (
        <div className='flex flex-col'>
            <div className='relative h-[300px] w-full overflow-hidden'>
                <img src={Img} 
                className='h-full w-full object-center object-cover' alt="" />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
                <Address/>
                <div className='flex flex-col gap-4'>
                    {
                        cartItems && cartItems.items && cartItems.items.length > 0 ? 
                        cartItems.map(item=> <UserCartItemContent cartItem={item} />) : null
                    }
                    <div className='mt-8 space-y-4'>
                        <div className='flex justify-between'>
                            <span className='font-bold'>Total</span>
                            <span className='font-bold'>${totalCartAmount}</span>
                        </div>
                    </div>
                    <div className='mt-4 w-full'>
                        <Button className="w-full">Checkout with Paypal</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCheckout
