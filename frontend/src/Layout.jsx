import React from 'react'
import Header from './Component/Landing/Header'
import Footer from './Component/Landing/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
