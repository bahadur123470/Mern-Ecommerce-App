import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { filterOptions } from '@/config';
import React, { Fragment } from 'react'

const ProductFilter = () => {
    return (
        <div className='bg-background rounded-lg shadow-sm'>
            <div className='p-4 border-b'>
                <h2 className='text-lg font-extrabold'>Filter</h2>
            </div>
            <div className='p-4 space-y-4'>
                {
                    Object.keys(filterOptions).map(keyItem=> 
                        <Fragment>
                            <div>
                                <h3 className='text-base font-bold'>{keyItem}</h3>
                                <div className='grid gap-2 mt-2'>
                                    {
                                        filterOptions[keyItem].map(option=> 
                                        <label className='flex items-center gap-2 font-medium'>
                                            <Checkbox />
                                            {option.label}
                                        </label>)
                                    }
                                </div>
                            </div>
                            <Separator/>
                        </Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default ProductFilter;
