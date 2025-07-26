import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartItemQuantity } from '@/store/shop/cart-slice'
import { toast } from 'sonner'

const UserCartItemContent = ({cartItem}) => {

    const {user} = useSelector(state=>state.auth)
    const {cartItem} = useSelector(state=> state.shopCart)
    const { productList } = useSelector(state=> state.shopProducts)
    const dispatch = useDispatch()

    function handleUpdateQuantity(getCartItem, typeOfAction){
        if(typeOfAction ==  'plus'){
            let getCartItems = cartItem.items || [];
                if(cartItem.length){
                    const indexOfCurrentCartItem = getCartItems.findIndex(item=> item.productId === getCartItem?.productId) 
                    const getTotalStock = productList[getCurrentProductIndex].totalStock
                    const getCurrentProductIndex = productList.findIndex(product=> product._id === getCartItem.productId)
                        if(indexOfCurrentCartItem > -1){
                            const getQuantity = getCartItems[indexOfCurrentCartItem].quantity
                                if(getQuantity + 1 > getTotalStock){
                                    toast({
                                        title: `Only ${getTotalStock} items are available`,
                                        variant: 'destructive'
                                    })
                                    return
                                }
                        }
                }    
        }
        dispatch(updateCartItemQuantity({
            userId: user?.id, productId: getCartItem?.productId, quantity: 
            typeOfAction === 'plus' ? getCartItem.quantity + 1 : getCartItem.quantity - 1
        })).then(data=> {
            if(data?.payload?.success){
                toast({
                    title: 'Cart Item is updated successfully',
                })
            }
        })
    }

    function handleCartItemDelete(getCartItem){
        dispatch(deleteCartItem(
            {userId: user?.id, productId: getCartItem?.ProductId}
        )).then(data=> {
            if(data?.payload?.success){
                toast({
                    title: 'Cart Item is deleted successfully',
                })
            }
        })
    }

    return (
        <div className='flex items-center space-x-4'>
            <img className='w-20 h-20 rounded object-cover' 
            src={cartItem?.image} alt={cartItem.title} />
            <div className='flex-1'>
                <h3 className='font-extrabold'>{cartItem?.item}</h3>
                <div className='flex items-center mt-1 gap-2'>
                    <Button onClick={()=>handleUpdateQuantity(cartItem,'minus')} 
                    disabled={cartItem?.quantity === 1}
                    className="w-8 h-8 rounded-full" variant="outline" size="icon">
                        <Minus className='w-4 h-4'/>
                        <span className='sr-only'>Decrease</span>
                    </Button>
                    <span className='font-semibold'>{cartItem?.quantity}</span>
                    <Button onClick={()=>handleUpdateQuantity(cartItem,'plus')} 
                    className="w-8 h-8 rounded-full" variant="outline" size="icon">
                        <Plus className='w-4 h-4'/>
                        <span className='sr-only'>Decrease</span>
                    </Button>
                </div> 
            </div>
            <div className='flex flex-col items-end'>
                <p className='font-semibold'>
                    ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price)
                     * cartItem?.quantity).toFixed(2)}
                </p>
                <Trash onClick={()=>handleCartItemDelete(cartItem)} className='cursor-pointer mt-1' size={20}/>
            </div>
        </div>
    )
}

export default UserCartItemContent
