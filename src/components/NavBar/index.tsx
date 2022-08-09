import React from 'react'


import style from './style.module.css'

type NavBarType = {
  children: JSX.Element[] | JSX.Element
}

const NavBar: React.FC<NavBarType> = ({ children }) => {
  return (
    <div className={style.navbar_container}>
      <div className={style.nav_logo}>Task</div>
      {children}
    </div>
  )
}


export default NavBar