import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar.jsx'
import AdminHeader from './header.jsx'
    const AdminLayout = () => {
        return (
            <div className='flex min-h-screen w-full'>
                {/ Sidebar can be added here if needed /}
                <AdminSidebar />
                <div className='flex flex-1 flex-col'>
                    {/ Header can be added here if needed /}
                    <AdminHeader />
                    {/ Main content area */}
                    <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
                        <Outlet />
                    </main>
                </div>
            </div>
        )
    }
    export default AdminLayout