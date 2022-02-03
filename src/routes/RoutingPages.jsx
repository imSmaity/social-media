import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Route, Routes, useNavigate } from 'react-router-dom'
import { BottomNavbar, Navbar, UserList } from '../components/components'
import {Explore, ForgotPassword, Home, Login, Profile, Signup, UserConnection} from '../pages/pages'
import './style.css'

function Redirect({to}){
    const navigate=useNavigate()
    useEffect(()=>{
        navigate(to)
    })
    return null
}


function RoutingPages() {
    const isLoggedIn=useSelector((state)=>state.userLogin)

    return (
        <>
            {
                isLoggedIn?
                <div className='row'>
                    <div className='col-lg-3 col-12 visible'>
                        <img id='icon' src={require('../Assets/images/dove.png')} alt="Logo" />
                        <Navbar/>
                    </div>
                    <Routes>
                        <Route path="login" element={<Login/>}  />
                        <Route path="/home" element={isLoggedIn?<Home/>:<Redirect to='/login' />}  />
                        <Route path="/" element={<Redirect to="/home"/>}  />
                        <Route path="/:uid" element={isLoggedIn?<Profile/>:<Redirect to='/login' />} />
                        <Route path="explore" element={isLoggedIn?<Explore/>:<Redirect to='/login' />}  />
                        <Route path={"signup"} element={<Signup/>}  />
                        <Route path="/:uid/followers" element={isLoggedIn?<UserConnection/>:<Redirect to='/login' />} />
                        <Route path="/:uid/following" element={isLoggedIn?<UserConnection/>:<Redirect to='/login' />} />
                        <Route path={"*"} element={<h1>Page not found!</h1>}  />
                    </Routes>
                    <div className='col-lg-3 col-12 visible' >
                        <UserList/>
                    </div>
                    <div className='col-12 lg-visible fixed-bottom' style={{marginBottom:'2vh'}}>
                        <BottomNavbar/>
                    </div>
                </div>:
                <center>
                    <Routes>
                            <Route path="login" element={<Login/>}  />
                            <Route path="/home" element={isLoggedIn?<Home/>:<Redirect to='/login' />}  />
                            <Route path="/" element={<Redirect to="/home"/>}  />
                            <Route path="/:uid" element={isLoggedIn?<Profile/>:<Redirect to='/login' />} />
                            <Route path="explore" element={isLoggedIn?<Explore/>:<Redirect to='/login' />}  />
                            <Route path={"signup"} element={<Signup/>}  />
                            <Route path={"forgot_password"} element={<ForgotPassword/>}  />
                            <Route path="/:uid/followers" element={isLoggedIn?<UserConnection/>:<Redirect to='/login' />} />
                            <Route path="/:uid/following" element={isLoggedIn?<UserConnection/>:<Redirect to='/login' />} />
                            <Route path={"*"} element={<h1>Page not found!</h1>}  />
                    </Routes>
                </center>
            }
        </>
        
    )
}

export default RoutingPages
