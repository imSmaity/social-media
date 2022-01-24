import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Search } from '../components';
import axios from 'axios'
import UserStatus from './UserStatus';
import { Link } from 'react-router-dom';


export function YouFollowing(user,following){
    let status=false

    for(let i=0;i<following.length;i++){
        if(following[i]===user._id){
            status=true
            i=following.length
        }
    }

    return status
}
function UserList() {
    const [loading,setLoading]=useState(false)
    const [users,setUsers]=useState(null)
    const userData=JSON.parse(localStorage.getItem('_syt2022_'))

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_USER_SIGNUP}/users`)
        .then((res)=>{
            setUsers(res.data.reverse())
            setLoading(true)
        })
    },[])

    
    return (
        <div className='row'>
            <div className='col-12'><Search/></div>
            <h5 className='col-12 mt-2'>You might like</h5>
            <div className='col-12'>
            {
                loading?
                users.map((user,index)=>{
                    if(!YouFollowing(user,userData.following) && userData.uid!==user._id){
                        return(
                            <div className='row mt-3' key={index}>
                                <div className='col-2'>
                                    <Link to={`/${user._id}`}> <img src={user.avatar} alt='pp' id='havatar'/></Link>
                                </div>
                                <div className="col-6">
                                    <Link to={`/${user._id}`}>{`${user.fname} ${user.lname}`}</Link>
                                    <div>{user._id}</div>
                                </div>
                                <div className="col-4">
                                    <UserStatus user={user}/>
                                </div>
                            </div>
                        )
                    }
                }):
                <div>Loading...</div>
            }
            </div>
        </div>
    );
}

export default UserList;
