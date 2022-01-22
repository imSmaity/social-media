import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Search } from '../components';
import axios from 'axios'
import UserStatus from './UserStatus';

function UserList() {
    const [loading,setLoading]=useState(false)
    const [users,setUsers]=useState(null)

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
                    return(
                        <div className='row mt-3' key={index}>
                            <div className='col-2'>
                                <img src={user.avatar} alt='pp' id='havatar'/>
                            </div>
                            <div className="col-6">
                                <div>{`${user.fname} ${user.lname}`}</div>
                                <div>{user._id}</div>
                            </div>
                            <div className="col-4">
                                <UserStatus user={user}/>
                            </div>
                        </div>
                    )
                }):
                <div>Loading...</div>
            }
            </div>
        </div>
    );
}

export default UserList;
