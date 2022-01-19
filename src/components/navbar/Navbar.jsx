import React from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../../redux/actions'
import './navbar.css'

export default function Navbar() {
    const dispatch=useDispatch()

    function logOut(){
        localStorage.removeItem('_syt2022_')
        dispatch(logout())
    }
    return (
        <div className='row container-fluid'>
            <Link to={'/'} className="col-12 td mt-5">
                <div className='link'>Home</div>
            </Link>
            <Link to={'profile'} className="col-12 td mt-5">
                <div className='link'>Profile</div>
            </Link>
            <Link to={'explore'} className="col-12 td mt-5">
                <div className='link'>Explore</div>
            </Link>
            <div className="col-12 td mt-5" onClick={logOut}>
                <div className='link'>Logout</div>
            </div>
        </div>
    )
}
