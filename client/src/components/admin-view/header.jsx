import React from 'react';
import { Button } from '../ui/button';
import { AlignJustify, LogOut } from 'lucide-react';

const AdminHeader = ({ setOpen }) => {
    return (
        <header className="flex items-center justify-between px-6 py-[20px] bg-background border-b shadow-sm">
            {/* Menu Button: Only visible on small/medium screens */}
            <Button 
                onClick={() => setOpen(true)}
                variant="ghost"
                size="icon"
                className="lg:hidden"
            >
                <AlignJustify className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            
            {/* Logo/Title for mobile when sidebar is hidden */}
            <div className="lg:hidden flex items-center gap-2">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            
            {/* Right-side Controls */}
            <div className="ml-auto flex items-center">
                <Button className="flex items-center gap-3 px-8 py-8 text-sm font-medium">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default AdminHeader;