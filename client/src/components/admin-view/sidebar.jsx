import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

    const adminSidebarMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: <LayoutDashboard />
        },
        {
            id: 'products',
            label: 'Products',
            path: '/admin/products',
            icon: <ShoppingBasket />
        },
        {
            id: 'orders',
            label: 'Orders',
            path: '/admin/orders',
            icon: <BadgeCheck />
        }
    ]
    function MenuItems(){
        const navigate = useNavigate()
        return <nav className="mt-8 flex-col flex gap-2">
        {
            adminSidebarMenuItems.map(MenuItems=> <div key={MenuItems.id} onClick={()=>navigate(MenuItems.path)} className='flex items-center gap-2 rounded-md px-3 py-2'>
                {MenuItems.icon}
                <span>{MenuItems.label}</span>
            </div>) 
        }
        </nav>
    }
    const AdminSidebar = () => {
        const navigate = useNavigate()
        return (
            <Fragment>
                <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                    <div onClick={()=>navigate('/admin/dashboard ')} className='flex cursor-pointer items-center gap-2'>
                    <ChartNoAxesCombined />
                        <h1 className='text-xl font-extrabold'>Admin Panel</h1>
                    </div>
                    <MenuItems />
                </aside>
            </Fragment>
        )
    }
    export default AdminSidebar 