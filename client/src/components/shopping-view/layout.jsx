import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from '../../components/shopping-view/header'

const ShoppingLayout = () => {
    return (
        <div className='flex flex-col bg-white overflow-hidden '>
            {/* Header can be added here if needed */}
            <ShoppingHeader />
                {/* Main content area */}
                <main className='flex flex-col w-full'>
                    <Outlet />
                </main>
        </div>
    )
}

export default ShoppingLayout
