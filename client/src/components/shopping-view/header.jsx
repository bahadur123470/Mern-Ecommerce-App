import { HousePlug, Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import UserCartWrapper from './cart-wrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { Label } from '../ui/label'

function MenuItems(){

    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    function handleNavigate(getCurrentMenuItem){
        sessionStorage.removeItem('filters')
        const currentFilter = getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !== 'products' ?
        {
            category: [getCurrentMenuItem.id],
        } : null
        sessionStorage.setItem('filters', JSON.stringify(currentFilter))

        location.pathname.includes('listing') && currentFilter !== null ? 
        setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) :
        navigate(getCurrentMenuItem.path)
    }
    return <nav className='flex flex-col mb-3 lg:mb-0 items-center gap-6 lg:flex-row'>
        {
            shoppingViewHeaderMenuItems.map(menuItem=> 
            <Label onClick={()=>handleNavigate(menuItem)} className='text-sm font-medium cursor-pointer'key={menuItem.id}>
                {menuItem.label}
            </Label>)
        }
    </nav>
}
function HeaderRightContent(){
    const { user } = useSelector((state)=> state.auth)
    const {cartItems} = useSelector(state=>state.shopCart)
    const[ openCartSheet, setOpenCartSheet ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout(){
        dispatch(logoutUser())
    }

    useEffect(()=>{
        dispatch(fetchCartItems(user?.id))
    },[dispatch])

    return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
        <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
            <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size="icons">
                <ShoppingCart className="h-6 w-6"/>
                <span className='sr-only'>User Cart</span>
            </Button>
        </Sheet>
        <UserCartWrapper 
        setOpenCartSheet={setOpenCartSheet}
        cartItems={cartItems &&  cartItems.items && cartItems.items.length > 0 ? 
        cartItems.items : []} />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black">
                    <AvatarFallback className="bg-black text-white font-extrabold">
                        {user?.username[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>navigate("/shop/account")}>
                    <UserRound className="mr-2 h-4 w-4"/>
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}
const ShoppingHeader = () => {
    const {isAuthenticated} = useSelector(state=>state.auth)
    return (
        <header className='sticky top-0 z-40 w-full border-b bg-background'>
            <div className='flex align-center justify-between px-6 md:px-8'>
                <Link to='/shop/home' className='flex items-center gap-2'>
                <HousePlug className='h-6 w-6' />
                <span className='font-bold'>Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu  className='h-6 w-6'/>
                            <span className='sr-only'>Toggle Header Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className="w-full max-w-xs">
                        <MenuItems />
                        <HeaderRightContent/>
                    </SheetContent>
                </Sheet>
                <div className='hidden lg:block'>
                    <MenuItems />
                </div>
                {
                    <div className='hidden lg:block'>
                        <HeaderRightContent />
                    </div>
                }
            </div>
        </header>
    )
}

export default ShoppingHeader
