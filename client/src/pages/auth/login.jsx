import React, { useState } from 'react'
import CommonForm from '@/components/common/form'
import { Link, useNavigate } from 'react-router-dom'
import { loginFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice'
import { toast } from 'sonner'
import AuthFormWrapper from '@/components/auth/AuthFormWrapper'

const initialState = {
  email: '',
  password: '',
}

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

    function onSubmit(event) {
        event.preventDefault()

        dispatch(loginUser(formData)).then((data) => {
            console.log('loginUser dispatch result:', data);
            if (data?.payload?.success) {
                toast.success(data?.payload?.message)
                navigate('/shop/home')
            } else {
                toast.error(data?.payload?.message)
            }
        })
    }

  return (
    <AuthFormWrapper
      title="Login to your account"
      subtitle="Don't have an account?"
      linkText="Register"
      linkTo="/auth/register"
    >
      <CommonForm
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </AuthFormWrapper>
  )
}

export default AuthLogin
