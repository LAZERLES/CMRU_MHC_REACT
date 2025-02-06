import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import FooterComp from '../components/Footer/FooterComp'

const UserLayout = ({children}) => {
  return (
    <>
        <NavBar />
        <main className="flex flex-col flex-grow ">
          {children}
        </main>
        <FooterComp />
    </>
  )
}

export default UserLayout