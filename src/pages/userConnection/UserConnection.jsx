import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Followers, Following, Navbar, UserList } from '../../components/components';
import './userConn.css'

function UserConnection() {
    const [loading,setLoading]=useState(false)
    const [users,setUsers]=useState(null)
    const [following,setFollowing]=useState(null)
    const [followers,setFollowers]=useState(null)
    const CURRENT_PATH=(window.location.pathname).split('/')
    const USER=useParams()
    const state=useSelector((state)=>state.updateRefresh)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_USER_SIGNUP}/users`)
        .then((res)=>{
            setUsers(res.data)
            const userData=JSON.parse(localStorage.getItem('_syt2022_'))
            for(let i=0;i<res.data.length;i++){
                if(res.data[i]._id==USER.uid){
                    setFollowers(res.data[i].followers)
                    setFollowing(res.data[i].following)   //Current routing users data get
                }
                if(res.data[i]._id===userData.uid){
                    userData.followers=res.data[i].followers
                    localStorage['_syt2022_']=JSON.stringify(userData)
                }
            }
            setLoading(true)
        })
    },[CURRENT_PATH[2],state])

  return (
    <>
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
                <Followers loading={loading} users={users} followers={followers}/>:
                <Following loading={loading} users={users} following={following} />
            }  
            </div>
            
        </div>
    </>
    )
}

export default UserConnection;
