import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { setProductDetails } from '@/store/shop/product-slice'

const productDetailsDialog = ({open, setOpen, productDetails}) => {

    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.auth)
    const {cartItem} = useSelector(state=> state.shopCart)

    function handleAddToCart(getCurrentProductId, getTotalStock){
        let getCartItems = cartItem.items || [];
            if(cartItem.length){
                const indexOfCurrentItem = getCartItems.findIndex(item=> item.productId === getCurrentProductId)
                if(indexOfCurrentItem > -1){
                    const getQuantity = getCartItems[indexOfCurrentItem].quantity
                    if(getQuantity + 1 > getTotalStock){
                        toast({
                            title: `Only ${getTotalStock} items are available`,
                            variant: 'destructive'
                        })
                        return
                    }
                }
            }
        dispatch(addToCart({
            userId: user?.id, 
            productId:  getCurrentProductId, 
            quantity: 1
        })
    ).then((data) => {
        if(data?.payload?.success){
            dispatch(fetchCartItems(user?.id))
            toast({
                title: 'Product is added to cart'
            })
        }
    })
    }

    function handleDialogClose(){
        setOpen(false)
        dispatch(setProductDetails())
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-col-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className='relative overflow-hidden rounded-lg'>
                    <img
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    width={600}
                    height={600}
                    className='aspect-square w-full object-cover'
                    />
                </div>
                <div className=''>
                    <div>
                        <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
                        <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary 'line-through' : ''}`}>
                            ${productDetails?.price}
                        </p>
                        {
                            productDetails?.salePrice > 0 ? 
                            <p className='text-2xl font-bold text-muted-foreground'>
                                ${productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='flex items-center gap-0.5'>
                            <StarIcon className='w-5 h-5 fill-primary'/>
                            <StarIcon className='w-5 h-5 fill-primary'/>
                            <StarIcon className='w-5 h-5 fill-primary'/>
                            <StarIcon className='w-5 h-5 fill-primary'/>
                            <StarIcon className='w-5 h-5 fill-primary'/>
                        </div>
                        <span className='text-muted-foreground'>{4.5}</span>
                    </div>
                    <div className='mt-5 mb-5'>
                        {
                            productDetails?.totalStock === 0 ?
                        <Button className="w-full opacity-60 cursor-not-allowed " onClick={()=>handleAddToCart(productDetails?._id, productDetails?.totalStock)}>Out of Stock</Button>:
                        <Button className="w-full" onClick={()=>handleAddToCart(productDetails?._id)}>Add to Cart</Button>
                        }
                        <Button className="w-full" onClick={()=>handleAddToCart(productDetails?._id)}>Add to Cart</Button>
                    </div>
                    <Separator/>
                    <div className='max-h-[300px] overflow-hidden '>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>BA</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-4 '>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Bahadur Ali</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                    </div>
                                    <p className='text-muted-foreground'>This is a awesome product </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-6 gap-2'>
                            <Input placeholder="Write a review..."/>
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default productDetailsDialog
