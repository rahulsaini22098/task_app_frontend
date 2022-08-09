import React from 'react'
import { Input, Button, Form } from 'antd'

const SignIn = () => {
  return(
    <Form>
      <Form.Item label="Email">
        <Input type="email" name="email" placeholder="eg. test@abc.com"/>
      </Form.Item>

      <Form.Item label="Password">
        <Input type="password" name="password" placeholder="*********" />
      </Form.Item>
      
      <Button type='primary'>Sign In</Button>
    </Form>
  )
}

export default SignIn