import React from 'react'
import AccImg from '../../assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/components/shopping-view/orders'
import Address from '@/components/shopping-view/address'

const ShoppingAccount = () => {
    return (
        <div className='flex flex-col'>
            <div className='relative h-[350px] w-full overflow-hidden'>
                <img 
                    height={'1600'}
                    width={'300'}
                    style={{aspectRatio: '1600/300', objectFit: 'cover'}}
                    src={AccImg} 
                    className='h-full w-full object-cover object-center' alt="AccImg" />
            </div>
            <div className='container mx-auto grid grid-cols1 gap-8 py-8'>
                <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                    <Tabs defaultValue="orders">
                        <TabsList>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <Orders/>
                        </TabsContent>
                        <TabsContent value="address">
                            <Address/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ShoppingAccount
