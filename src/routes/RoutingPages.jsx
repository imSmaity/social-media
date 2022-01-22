import React from 'react'
import {Route, Routes,  } from 'react-router-dom'
import {Explore, Home, Login, Profile, Signup} from '../pages/pages'

function RoutingPages() {

    return (
        
        <Routes>
            <Route path="/home" element={<Home/>}  />
            <Route path="/:uid" element={<Profile/>} />
            <Route path="explore" element={<Explore/>}  />
            <Route path={"signup"} element={<Signup/>}  />
            <Route path="login" element={<Login/>}  />
        </Routes>
    )
}

export default RoutingPages
