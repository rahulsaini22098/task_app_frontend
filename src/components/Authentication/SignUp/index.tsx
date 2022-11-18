import React from 'react'
import { Button, Form, Input } from 'antd'
import { useFormik } from 'formik'
import { object, ref, SchemaOf, string } from 'yup'

import axios from '../../../utilities/axios'
import { useAppDispatch } from '../../../redux/hook'
import { signUpUser } from '../../../redux/slice/userSlice'

export type SignUpTypes = {
  name: string,
  email: string,
  password: string,
  confirm_password: string
}

const initialState: SignUpTypes = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
}

const SignUp = () => {

  const dispatch = useAppDispatch()

  const signUpValidation: SchemaOf<SignUpTypes> = object({
    name: string().trim().min(1).required(),
    email: string().email().required(),
    password: string().min(5).required(),
    confirm_password: string().equals([ref('password')]).required()
  })

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signUpValidation,
    onSubmit: (values: SignUpTypes) => {
      onSignUpHandler(values)
    }
  })
  
  const { values, touched, errors, handleChange, handleSubmit, resetForm } = formik

  const onSignUpHandler = async (values: SignUpTypes) => {
    dispatch(signUpUser(values))
    resetForm()
  }


  return (
    <Form layout='vertical' onSubmitCapture={handleSubmit}>
      <Form.Item label="Full Name">
        <Input 
          type="text"
          name="name" 
          value={values.name}
          placeholder="eg. Joe Root" 
          onChange={handleChange}
          status={touched.name && errors.name !== undefined ? 'error' : ''}
        />
      </Form.Item>

      <Form.Item label="Email">
        <Input 
          type="email"
          name="email" 
          value={values.email}
          placeholder="eg. test@abc.com"
          onChange={handleChange}
          status={touched.name && errors.email !== undefined ? 'error' : ''}
        />
      </Form.Item>

      <Form.Item label="Password">
        <Input 
          type="password" 
          name="password"
          value={values.password} 
          onChange={handleChange}
          status={touched.password && errors.password !== undefined ? 'error' : ''}
        />
      </Form.Item>

      <Form.Item label="Confirm Password">
        <Input 
          type="password"
          name="confirm_password" 
          value={values.confirm_password}
          onChange={handleChange}
          status={touched.confirm_password && errors.confirm_password !== undefined ? 'error' : ''}
        />
      </Form.Item>

      <Button type='primary' htmlType='submit'>Sign Up</Button>
    </Form>
  )
}

export default SignUp