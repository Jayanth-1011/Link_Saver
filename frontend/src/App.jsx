import React, { useState , useEffect } from 'react'
import "./index.css"
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'

import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import LoginPage from './pages/LoginPage'
import SignUpPage from "./pages/SignupPage"
const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const [theme , setTheme] =useState(true)

  useEffect(()=>{
    checkAuth()
    
    
  }, [])

  if(isCheckingAuth){
    return(
      <div  className='flex items-center justify-center h-screen'>
        <span className="loading loading-spinner text-primary"></span>
      </div>
    )
  }
  return (
    <div data-theme= {theme?`forest`:`fantasy`} className='flex flex-col min-h-screen items-center justify-center  bg-base-100' >
      <Toaster />
      <NavBar theme = {theme} setTheme = {setTheme} />
      <Routes>
      <Route path = "/" element = {authUser?<HomePage />: <Navigate to ="/login" />}/>
      <Route path = "/login" element = {!authUser?<LoginPage />: <Navigate to ="/" />}/>
      <Route path = "/signup" element = {!authUser?<SignUpPage />: <Navigate to ="/" />}/>
      </Routes>
    </div>
  )
}

export default App