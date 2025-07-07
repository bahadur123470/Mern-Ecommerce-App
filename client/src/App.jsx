import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login.jsx'
import AuthRegister from './pages/auth/register.jsx'
import AdminLayout from './components/admin-view/layout.jsx'
import AdminDashboard from './pages/admin-view/dashboard.jsx'
import AdminFeatures from './pages/admin-view/features.jsx'
import AdminProducts from './pages/admin-view/products.jsx'
import AdminOrders from './pages/admin-view/orders.jsx'
import ShoppingLayout from './components/shopping-view/layout.jsx'
import NotFound from './pages/not-found/index.jsx'
import ShoppingHome from './pages/shopping-view/home.jsx'
import ShoppingAccount from './pages/shopping-view/account.jsx'
import ShoppingListing from './pages/shopping-view/listing.jsx'
import ShoppingCheckout from './pages/shopping-view/checkout.jsx'
import CheckAuth from './components/common/check-auth.jsx'
import UnauthPage from './pages/unauth-page/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"

const App = () => {
  const {user, isAuthenticated, loading} = useSelector(state=> state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth()) 
  },[dispatch])

  if (loading) return <Skeleton className="h-[600px] w-[800px] bg-black" />

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* <h1>MERN APP</h1> */}



      <Routes>
        <Route path='/auth' element={ 
            <AuthLayout/>
        } >
        <Route path='login' element={<AuthLogin/>} />
        <Route path='register' element={<AuthRegister/>} />
        </Route>
        <Route path='/admin' element={
            <AdminLayout/>
        } >
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='features' element={<AdminFeatures />} />
        <Route path='products' element={<AdminProducts />} />
        <Route path='orders' element={<AdminOrders />} />
        </Route>
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        } >
        <Route path='home' element={<ShoppingHome />} />
        <Route path='listing' element={<ShoppingListing />} />
        <Route path='account' element={<ShoppingAccount />} />
        <Route path='checkout' element={<ShoppingCheckout />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path='*' element= {<NotFound />} />
      </Routes>
      
    </div>
  )
}

export default App
