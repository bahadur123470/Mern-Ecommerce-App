import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchProductDetails } from '@/store/shop/product-slice';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner';

const SearchProducts = () => {

    const [keyword, setKeyword] = useState('');
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {searchResults} = useSelector(state=>state.shopSearch);
    const {productDetails} = useSelector(state=>state.shopProducts);
    const {cartItem} = useSelector(state=>state.shopCart);
    const {user} = useSelector(state=>state.auth);

    useEffect(()=> {
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
            setTimeout(()=> {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000)
        }
        else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(resetSearchResults())
        }
    },[keyword])

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

    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId)
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true)
        }, [productDetails])

    console.log(searchResults, 'searchResults')

    return (
        <div className='container mx-auto md:px-6 px-4 py-8'>
            <div className='flex justify-center mbb-8'>
                <div className='w-full flex items-center'>
                    <Input 
                    value={keyword} 
                    name="keyword" 
                    onChange={(event)=> setKeyword(event.target.value)} 
                    className="py-6" 
                    placeholder='Search for products...'/>
                </div>
            </div>
            {
                !searchResults.length ?
                <h1 className='text-5xl font-extra-bold'>No result found!</h1>
                : null
            }
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    searchResults.map((item)=> <ShoppingProductTile 
                    handleAddToCart={handleAddToCart} 
                    product={item} />)
                }
            </div>
                <ProductDetailsDialog 
                open={openDetailsDialog} 
                setOpen={setOpenDetailsDialog} 
                productDetails={productDetails}/>
        </div>
    )
}

export default SearchProducts
