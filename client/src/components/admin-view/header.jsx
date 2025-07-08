import React from 'react';
import { Button } from '../ui/button';
import { AlignJustify, LogOut } from 'lucide-react';

const AdminHeader = ({ setOpen }) => {
    return (
        <header className="flex items-center justify-between px-6 py-[20px] bg-background border-b shadow-sm">
            {/* Menu Button: Visible on small/medium, hidden on large screens */}
            <Button 
            onClick={()=> setOpen(true)}
            className="lg:hidden sm:block">
                <AlignJustify className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            {/* Right-side Controls */}
            <div className="ml-auto">
                <Button className="flex items-center gap-3 px-8 py-8 text-sm font-medium">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default AdminHeader;