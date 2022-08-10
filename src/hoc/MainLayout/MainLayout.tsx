import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate  } from 'react-router-dom'

import axios from '../../utilities/axios'
import NavBar from '../../components/NavBar'
import { getUser, User } from '../../utilities/helperfunction'

import style from './style.module.css'

type MainLayoutProps = {
    children: JSX.Element
}

const MainLayout: React.FC<MainLayoutProps>  = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [userDetail, setUserDetail] = useState<User>()

  const naviagte = useNavigate()


  useEffect(() => {
    const { token, user } = getUser()

    if(token !== null){
      setToken(token)
    }
    
    if(user !== null){
      setUserDetail(user)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    naviagte('/signin')
  }

  const changePictureHandler = (e: { target: HTMLInputElement }) => {
    const file = e.target.files?.[0]
        
    if(file){
      const formData = new FormData()
      formData.set('profile_picture', file, file.name)
      axios.post('/user/profilepicture/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if(userDetail !== undefined && res.data !== null){   
            setUserDetail({ ...userDetail, profile_picture: res.data.profile_picture })
            localStorage.setItem('user', JSON.stringify(userDetail))
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <React.Fragment>
      <NavBar>
        <div className={style.nav_links}>
          <NavLink to="/"> Create Task </NavLink>
          <NavLink to="/completed">Completed Task </NavLink>
        </div>
        <div className={style.nav_right}>
          <div className={style.user_profile_image}>
            { userDetail == undefined || userDetail.profile_picture == null
              ? <UserOutlined />
              : <img src={userDetail.profile_picture} width="100%" height="100%" />
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
      {children}
    </React.Fragment>
  )
}

export default MainLayout