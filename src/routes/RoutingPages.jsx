import React from 'react'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import {Explore, Home, Login, Profile, Signup} from '../pages/pages'

function RoutingPages() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}  />
                <Route path="profile" element={<Profile/>}  />
                <Route path="explore" element={<Explore/>}  />
                <Route path={"signup"} element={<Signup/>}  />
                <Route path="login" element={<Login/>}  />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutingPages
