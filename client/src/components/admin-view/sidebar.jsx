import {
    BadgeCheck,
    ChartNoAxesCombined,
    LayoutDashboard,
    ShoppingBasket,
} from 'lucide-react';
import React, { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />,
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />,
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <BadgeCheck />,
    },
];

function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="mt-8 flex flex-col space-y-[10px]">
            {adminSidebarMenuItems.map((menuItem) => {
                const isActive = location.pathname === menuItem.path;

                return (
                    <div
                        key={menuItem.id}
                        onClick={() => navigate(menuItem.path)}
                        className={`flex text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors ${
                            isActive
                                ? 'bg-muted text-foreground'
                                : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        {menuItem.icon}
                        <span className="text-sm font-medium">{menuItem.label}</span>
                    </div>
                );
            })}
        </nav>
    );
}

const AdminSidebar = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <aside className="flex w-[170px] flex-col border-r bg-background p-6">
                <div
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <ChartNoAxesCombined />
                    <h1 className="text-3xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
};

export default AdminSidebar;
