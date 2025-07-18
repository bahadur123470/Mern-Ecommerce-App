import React, { useEffect, useState } from 'react'
import ProductFilter from '../../components/shopping-view/filter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { sortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { useSearchParams } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { toast } from 'sonner'


function createSearchParamsHelper(filterParams){
    const queryParams = [];

    for(const [key,value] of Object.entries(filterParams)){
        if(Array.isArray(value) && value.length > 0 ){
            const paramsValue = value.join(',')

            queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`)
        }
    }
    return queryParams.join('&')
}
const ShoppingListing = () => {
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch
    const { productList, productDetails} = useSelector(state=> state.shopProducts)
    const[filters, setFilters ] = useState({});
    const [sort, setSort] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)


    function handleSort(value){
        setSort(value)
    }
    function handleFilter(getSectionId, getCurrentOption){

        let cpyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)

        if(indexOfCurrentSection === -1){
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        }
        else{
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)

            if (indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption)
            else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
        }   
        setFilters(cpyFilters)
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
    }
    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId)
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
        setSort("price-lowtohigh")
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})        
    })

    useEffect(()=>{
        if(filters && Object.keys(filters).length > 0 ){
            const createQueryString = createSearchParamsHelper(filters)
            searchParams(new URLSearchParams(createQueryString))
        }
    },[filters])

    useEffect(()=>{
        if(filters !== null && sort !== null){
        }
        dispatch(fetchAllFilteredProducts({ filterParams : filters, sortParams : sort }))
    },[dispatch, sort, filters])

    useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])

    return (
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
            <ProductFilter filters={filters} handleFilter={handleFilter}/>
            <div className='bg-background w-full rounded-lg shadow-sm '>
                <div className='p-4 border-b flex items-center justify-between'>
                    <h2 className='text-lg font-extrabold'>All Products</h2>
                    <div className='flex items-center gap-3'>
                        <span className='text-muted-foreground'>{productList?.length}products</span>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowUpDown className="w-4 h-4" />
                            <span>Sort by</span>
                            </Button>
                        </DropdownMenuTrigger> 
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                {
                                    sortOptions.map(sortItem=> 
                                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {
                        productList && productList.length > 0 ?
                        productList.map(productItem=>
                        <ShoppingProductTile 
                        handleGetProductDetails={handleGetProductDetails} 
                        product={productItem}
                        handleAddToCart={handleAddToCart}
                        /> ) : null
                    }
                </div>
            </div>
            <productDetailDialog 
            open={openDetailsDialog} 
            setOpen={setOpenDetailsDialog} 
            productDetails={productDetails}/>
        </div>
    )
}

export default ShoppingListing
