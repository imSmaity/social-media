import React from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../../redux/actions'
import './navbar.css'

export default function Navbar() {
    const dispatch=useDispatch()
    const naviga=useNavigate()
    
    const UID=JSON.parse(localStorage.getItem('_syt2022_')).uid
    function logOut(){
        localStorage.removeItem('_syt2022_')
        dispatch(logout())
        naviga('/login')
    }
    return (
        <div className='row container-fluid'>
            <div  className="col-12 td mt-5">
                <Link to={'/home'} className='linkl'>
                    Home
                </Link>
            </div>
            <div  className="col-12 td mt-5">
                <Link to={`/${UID}`} className='linkl'>
                    Profile
                </Link>
            </div>
            <div className="col-12 td mt-5">
                <Link to={'/login'} className='linkl' onClick={logOut}>
                    Logout
                </Link>
            </div>
        </div>
    )
}
