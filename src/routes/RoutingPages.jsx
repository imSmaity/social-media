import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Route, Routes, useNavigate } from 'react-router-dom'
import {Explore, Home, Login, Profile, Signup, UserConnection} from '../pages/pages'

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
        
        <Routes>
            <Route path="login" element={<Login/>}  />
            <Route path="/home" element={isLoggedIn?<Home/>:<Redirect to='/login' />}  />
            <Route path="/" element={<Redirect to="/home"/>}  />
            <Route path="/:uid" element={isLoggedIn?<Profile/>:<Redirect to='/login' />} />
            <Route path="explore" element={isLoggedIn?<Explore/>:<Redirect to='/login' />}  />
            <Route path={"signup"} element={<Signup/>}  />
            <Route path="/:uid/followers" element={isLoggedIn?<UserConnection/>:<Redirect to='/login' />} />
            <Route path="/:uid/following" element={isLoggedIn?<UserConnection/>:<Redirect to='/login' />} />
        </Routes>
    )
}

export default RoutingPages
