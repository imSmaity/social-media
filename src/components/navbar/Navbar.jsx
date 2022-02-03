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
            <Link to={'/home'} className="col-12 td mt-5">
                <div className='linkl'>Home</div>
            </Link>
            <Link to={`/${UID}`} className="col-12 td mt-5">
                <div className='linkl'>Profile</div>
            </Link>
            <div className="col-12 td mt-5" onClick={logOut}>
                <div className='linkl'>Logout</div>
            </div>
        </div>
    )
}
