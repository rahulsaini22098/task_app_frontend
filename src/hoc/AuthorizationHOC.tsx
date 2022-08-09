import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { getUser } from '../utilities/helperfunction'

import MainLayout from './MainLayout/MainLayout'

type AuthorizationHocProp = {
    children: JSX.Element,
}

const AuthorizationHOC: React.FC<AuthorizationHocProp> = ({ children }) =>{
  const { token, user } = getUser()
  const location = useLocation()

  if(token == null && user == null){
    return (<Navigate to="/signin" state={{ from: location }} />)
  }

  return (<MainLayout>{children}</MainLayout>)
}

export default AuthorizationHOC