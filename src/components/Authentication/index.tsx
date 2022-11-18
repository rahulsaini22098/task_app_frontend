/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../redux/hook'
import { getUser } from '../../utilities/helperfunction'

import SignIn from './SignIn'
import SignUp from './SignUp'
import style from './style.module.css'

const Authentication = () => {
  const [Signin, setSignIn] = useState<boolean>(true)
  const userDetail = useAppSelector((state => state.user))
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() =>{
    const { user, token } = getUser()

    if(user !== null && token !== null){
      navigate('/', { replace: true })
    }


    if(location.pathname !== '/signin'){
      setSignIn(false)
    } else{
      setSignIn(true)
    }
  }, [location, userDetail.token, userDetail.user])

  const routeHandler = (pathname: string) => {
    navigate(pathname, { replace: false })
  }

  let heading = null

  if(Signin){
    heading = (
      <>
        <div className={style.main_heading}>Sign in to your account</div>
        <div className={style.sub_heading}>Don't have an account?<span onClick={() => routeHandler('/signup')}>SIGN UP</span></div>
      </>
    )
  } else{
    heading = (
      <>
        <div className={style.main_heading}>Create your Account</div>
        <div className={style.sub_heading}>Already have an Account? <span onClick={() => routeHandler('/signin')}>SIGN IN</span></div>
      </>
    )
  }

  return (
    <div className={style.main_body}>
      {heading}
      <div className={style.form_container}>
        {Signin ? <SignIn /> : <SignUp />}
      </div>
    </div>
  )
}

export default Authentication