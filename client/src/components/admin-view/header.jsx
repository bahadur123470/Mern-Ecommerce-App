import React from 'react';
import { Button } from '../ui/button';
import { AlignJustify, LogOut } from 'lucide-react';

const AdminHeader = () => {
    return (
        <header className="flex items-center justify-between px-6 py-[20px] bg-foreground border-b shadow-sm">
            {/* Menu Button: Visible on small/medium, hidden on large screens */}
            <Button variant="ghost" size="icon" className="lg:hidden">
                <AlignJustify className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            {/* Right-side Controls */}
            <div className="ml-auto">
                <Button className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default AdminHeader;