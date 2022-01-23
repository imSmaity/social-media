import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Followers, Following, Navbar, UserList } from '../../components/components';
import './userConn.css'

function UserConnection() {
    const [loading,setLoading]=useState(false)
    const [users,setUsers]=useState(null)
    const CURRENT_PATH=(window.location.pathname).split('/')
    const USER=useParams()

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_USER_SIGNUP}/users`)
        .then((res)=>{
            setUsers(res.data)
            setLoading(true)
        })
    },[])

  return (
    <div  className='row'>
        <div className='col-3'><Navbar/></div>
        <div className='col-6 mt-1'>
            <div className='row'>
            
                <Link to={`/${USER.uid}/followers`} className='col-6 fbtn'>
                    <div id='foll'  style={CURRENT_PATH[2]==='followers'?{fontWeight:'bold'}:{fontWeight:'initial'}}>Followers</div>
                </Link>
                <Link to={`/${USER.uid}/following`} className='col-6 fbtn'>
                    <div id='foll' style={CURRENT_PATH[2]==='followers'?{fontWeight:'initial'}:{fontWeight:'bold'}}>Following</div>
                </Link>
            {
                CURRENT_PATH[2]==='followers'?
                <Followers loading={loading} users={users}/>:
                <Following loading={loading} users={users}/>
            }  
            </div>
            
        </div>
        <div className='col-3'><UserList/></div>
    </div>
    )
}

export default UserConnection;
