import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();
    console.log(location.pathname, isAuthenticated)

    if(location.pathname === "/"){
        if(!isAuthenticated){
            return <Navigate to="/auth/login" />
        } else {
            if (user?.role === 'admin') {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/shop/home" />;
            }
        }
    }
    // If not authenticated and not on login/register pages, redirect to login
    if (
        !isAuthenticated && 
        !(
            location.pathname.includes("/login") || 
            location.pathname.includes("/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }
    
    // If authenticated and on login/register pages, redirect based on role
    if (
        isAuthenticated &&
        (
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )
    ) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }
    
    // If authenticated non-admin user tries to access admin pages
    if (
        isAuthenticated && 
        user?.role !== "admin" && 
        location.pathname.includes("admin")
    ) {
        return <Navigate to="/unauth-page" />;
    }
    
    // If authenticated admin user tries to access shop pages
    if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.includes("shop")
    ) {
        return <Navigate to="/admin/dashboard" />;
    }
    
    return <>{children}</>;
};

export default CheckAuth;