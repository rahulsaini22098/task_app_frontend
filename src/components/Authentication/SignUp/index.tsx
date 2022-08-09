import React from 'react'
import { Button, Form, Input } from 'antd'

const SignUpForm = () => {
  return (
    <Form>
      <Form.Item label="Full Name">
        <Input type="text" name="name" placeholder="eg. Joe Root"  />
      </Form.Item>

      <Form.Item label="Email">
        <Input type="email" name="email" placeholder="eg. test@abc.com"/>
      </Form.Item>

      <Form.Item label="Password">
        <Input type="password" name="password" placeholder="*********" />
      </Form.Item>

      <Form.Item label="Confirm Password">
        <Input type="password" name="confirm_password" placeholder="*********" />
      </Form.Item>

      <Button type='primary'>Sign Up</Button>
    </Form>
  )
}

export default SignUpForm