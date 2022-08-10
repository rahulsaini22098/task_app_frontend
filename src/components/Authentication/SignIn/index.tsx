import React from 'react'
import { Input, Button, Form } from 'antd'
import { useFormik } from 'formik'
import { object, SchemaOf, string } from 'yup'
import { useNavigate } from 'react-router-dom'

import axios from '../../../utilities/axios'

type SignInTypes = {
  email: string,
  password: string
}

const initialState: SignInTypes = {
  email: '',
  password: ''
}

const SignIn = () => {
  const navigate = useNavigate()

  const validationSchema: SchemaOf<SignInTypes> = object({
    email: string().email().required(),
    password: string().required().min(5)
  })

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values: SignInTypes) => {
      signInHandler(values)
    }
  })

  const { values, touched, errors, handleChange, handleSubmit, resetForm } = formik

  const signInHandler = async (values: SignInTypes) => {
    try{
      const user = await axios.post('/user/login', values)
      localStorage.setItem('user', JSON.stringify(user.data.user))
      localStorage.setItem('token', user.data.token || null)
      resetForm()
      navigate('/')
    } catch(error){
      console.log(error)
    }
  }

  return(
    <Form layout='vertical' onSubmitCapture={handleSubmit} >
      <Form.Item label="Email">
        <Input
          type="email" 
          name="email"
          value={values.email}
          placeholder="eg. test@abc.com"
          onChange={handleChange}
          status={touched.email && errors.email !== undefined ? 'error' : ''}
        />
      </Form.Item>

      <Form.Item label="Password">
        <Input 
          type="password"
          name="password" 
          value={values.password} 
          onChange={handleChange}
          status={touched.email && errors.password !== undefined ? 'error' : ''}
        />
      </Form.Item>
      
      <Button type='primary' htmlType='submit'>Sign In</Button>
    </Form>
  )
}

export default SignIn