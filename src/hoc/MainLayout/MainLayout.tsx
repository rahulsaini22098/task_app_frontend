import React from 'react'
import { NavLink, useNavigate  } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { ErrorBoundary } from 'react-error-boundary'

import axios from '../../utilities/axios'
import NavBar from '../../components/NavBar'
import { useAppSelector } from '../../redux/hook'

import style from './style.module.css'

type MainLayoutProps = {
    children: JSX.Element
}

const MainLayout: React.FC<MainLayoutProps>  = ({ children }) => {
  const { token, user } = useAppSelector((state) => state.user)

  const naviagte = useNavigate()

   

  const logoutHandler = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    naviagte('/signin')
  }

  const changePictureHandler = (e: { target: HTMLInputElement }) => {
    const file = e.target.files?.[0]
        
    // if(file){
    //   const formData = new FormData()
    //   formData.set('profile_picture', file, file.name)
    //   axios.post('/user/profilepicture/upload', formData, {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //       'authorization': `Bearer ${token}`
    //     }
    //   })
    //     .then(res => {
    //       if(user !== null && res.data !== null){   
    //         setUserDetail({ ...userDetail, profile_picture: res.data.profile_picture })
    //         localStorage.setItem('user', JSON.stringify(userDetail))
    //       }
    //     })
    //     .catch(err => console.log(err))
    // }
  }

  const ErrorFallback = (): JSX.Element => {
    return ( <h1 className={style.error_boundary}>Stay Clam</h1>)
  }

  

  return (
    <React.Fragment>
      <NavBar>
        <div className={style.nav_links}>
          <NavLink to="/"> Create Task </NavLink>
          <NavLink to="/completed">Completed Task </NavLink>
          <NavLink to="/scroll">Infinite Scroll </NavLink>
        </div>
        <div className={style.nav_right}>
          <div className={style.user_profile_image}>
            { user == null || user.profile_picture == null
              ? <UserOutlined />
              : <img src={user.profile_picture} width="100%" height="100%" />
            }
            <input
              className={style.input_upload_file}
              type="file"
              accept="image/*"
              onChange={(e) => changePictureHandler(e)} />
          </div>
          <div className={style.logout_btn} onClick={logoutHandler}>Logout</div>
        </div>
      </NavBar>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </React.Fragment>
  )
}

export default MainLayout