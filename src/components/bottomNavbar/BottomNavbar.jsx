import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions';


function BottomNavbar() {
    const dispatch=useDispatch()
    const naviga=useNavigate()

    const UID=JSON.parse(localStorage.getItem('_syt2022_')).uid
    function logOut(){
        localStorage.removeItem('_syt2022_')
        dispatch(logout())
        naviga('/login')
    }
  return (
        <div className='row p-2' style={{backgroundColor:'white'}}>
            <div className='col-3'>
                <Link to={'/home'}>
                    <img src={require('../../Assets/images/home.png')} alt="home" />
                </Link>
            </div>
            <div className='col-3'>
                <Link to={'/explore'}>
                    <img className='ms-2' src={require('../../Assets/images/search.png')} alt="search" />
                </Link>
            </div>
            <div className='col-3' >
                <Link to={`/${UID}`}>
                    <img className='ms-3' src={require('../../Assets/images/account.png')}  alt="account" />
                </Link>
            </div>
            <div className='col-3'>
                <img className='ms-3' src={require('../../Assets/images/exit.png')} alt="exit" onClick={logOut}/>
            </div>
        </div>
    );
}

export default BottomNavbar;
