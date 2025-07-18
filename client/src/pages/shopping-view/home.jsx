import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Ribbon, ShirtIcon, Umbrella, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { useNavigate } from 'react-router-dom'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { productDetailsDialog } from '@/components/shopping-view/product-details.jsx' 


const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids",icon: BabyIcon  },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: Umbrella },
];
const brandWithIcon = [
    { id: "nike", label: "Nike", icon: Ribbon },
    { id: "adidas", label: "Adidas", icon: Ribbon },
    { id: "puma", label: "Puma", icon: Ribbon },
    { id: "levis", label: "Levi's", icon: Ribbon },
    { id: "zara", label: "Zara", icon: Ribbon },
    { id: "h&m", label: "H&M", icon: Ribbon },
];
const ShoppingHome = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentSlide, setCurrentSlide] = useState(0)
    const {productList, productDetails} = useSelector(state=> state.shopProducts)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)  
    const { user } = useSelector(state=> state.auth)
    const slides = [bannerOne, bannerTwo, bannerThree]

    function handleNavigateToListingPage(getCurrentItem, section){
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }
        sessionStorage.setItem('filters', JSON.stringify(currentFilter))
        navigate(`/shop/listing`)
    }

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    function handleAddToCart(getCurrentProductId){
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

    useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentSlide(prevSlide=> (prevSlide + 1)% slides.length)
        }, 2000)
        return ()=> clearInterval(timer)
    }, [])

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({filterParams: {}, sortParams: 'price-lowtohigh'}))
    }, [dispatch])

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='relative w-full h-[600px] overflow-hidden'>
                {
                    slides.map((slide, index)=> (
                        <img 
                            src={slide}
                            key={index}
                            className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover`}
                        />
                    ))
                }
                <Button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
                variant="outline" size="icon" 
                onClick={()=>setCurrentSlide(prevSlide=> (prevSlide -1 + slides.length) % slides.length)}>
                    <ChevronLeftIcon className='w-4 h-4'/>
                </Button>
                <Button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
                variant="outline" size="icon" 
                onClick={()=>setCurrentSlide(prevSlide=> (prevSlide + 1) % slides.length)}>
                    <ChevronRightIcon className='w-4 h-4'/>
                </Button>
            </div>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {
                            categoriesWithIcon.map(categoryItem=> 
                            <Card onClick={()=>handleNavigateToListingPage(categoryItem, 'category')} 
                            key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span className='font-bold'>{categoryItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {
                            brandWithIcon.map(brandItem=> 
                            <Card onClick={()=>handleNavigateToListingPage(brandItem, 'brand')} 
                            key={brandItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brandItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span className='font-bold'>{brandItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {
                            productList && productList.length > 0 ?
                            productList.map((productItem)=> (
                            <ShoppingProductTile handleGetProductDetails={handleGetProductDetails}
                            key={productItem._id} product={productItem}
                            handleAddToCart={handleAddToCart}
                            /> 
                            )) : null
                        } 
                    </div>
                </div>
            </section>
            <productDetailsDialog
            open={openDetailsDialog} 
            setOpen={setOpenDetailsDialog} 
            productDetails={productDetails}/>
        </div>
    )
}

export default ShoppingHome
