import React from 'react'

import NavBar from '../components/NavBar'

type MainLayoutProps = {
    children?: JSX.Element
}
const MainLayout: React.FC<MainLayoutProps>  = ({ children }) => {
  return (
    <React.Fragment>
      <NavBar />
      {children}
    </React.Fragment>
  )
}

export default MainLayout