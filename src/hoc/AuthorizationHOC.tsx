import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../redux/hook'
import { setUserLogin } from '../redux/slice/userSlice'
import { getUser } from '../utilities/helperfunction'

import MainLayout from './MainLayout/MainLayout'

type AuthorizationHocProp = {
    children: JSX.Element,
}

const AuthorizationHOC: React.FC<AuthorizationHocProp> = ({ children }) =>{
  const { token, user } = getUser()
  const location = useLocation()
  const userDetail = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(userDetail.token == null && userDetail.user == null){
      dispatch(setUserLogin({ token, user }))
    }
  }, [userDetail.token, userDetail.user])

  if(token == null && user == null){
    return (<Navigate to="/signin" state={{ from: location }} />)
  }

  return (<MainLayout>{children}</MainLayout>)
}

export default AuthorizationHOC