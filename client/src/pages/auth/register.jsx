import React, { useState } from 'react'
import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const initialState = {
    username: '',
    email: '',
    password: '',
}
function onSubmit(){
    
}
const AuthRegister = () => {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data)=> {
            if(data?.payload?.success){
                toast({
                    title: data?.payload?.message,
                });
                navigate("/auth/login");
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive',
                })
            }
        });
    }
    console.log(formData)

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create a new account</h1>
                <p className='mt-2'>
                    Already have an account?
                    <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthRegister
