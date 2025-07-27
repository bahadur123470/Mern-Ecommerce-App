import React, { useState } from 'react'
import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import AuthFormWrapper from '@/components/auth/AuthFormWrapper'

const initialState = {
    username: '',
    email: '',
    password: '',
}

const AuthRegister = () => {
    
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(event) {
    event.preventDefault()

    dispatch(registerUser(formData)).then((data) => {
        if (data?.payload?.success) {
            toast.success(data?.payload?.message)
            navigate('/auth/login')
        } else {
            toast.error(data?.payload?.message)
        }
    })
    }

    return (
    <AuthFormWrapper
        title="Create a new account"
        subtitle="Already have an account?"
        linkText="Login"
        linkTo="/auth/login"
    >
    <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
    />
    </AuthFormWrapper>
    )
}

export default AuthRegister
