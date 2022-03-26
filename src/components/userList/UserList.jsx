import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loading, Search } from '../components';
import axios from 'axios'
import UserStatus from './UserStatus';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


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
    const [allUser,setAllUser]=useState(null)
    const userData=JSON.parse(localStorage.getItem('_syt2022_'))
    const paramsUid=useParams().uid
    const state=useSelector((state)=>state.updateRefresh)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_USER_SIGNUP}/users`)
        .then((res)=>{
            setUsers(res.data.reverse())
            setAllUser(res.data.reverse())
            setLoading(true)
        })
    },[state])

    
    return (
        <div className='row'>
            {
                loading?
                <>
                    <div className='col-12'><Search allUser={allUser} setUsers={setUsers}/></div>
                    <h5 className='col-12 mt-2'>{users.length===0?'No user found.':'You might like'}</h5>
                    <div className='col-12'>
                    {
                        users.map((user,index)=>{
                            if(!YouFollowing(user,userData.following) && userData.uid!==user._id && paramsUid!==user._id){
                                return(
                                    <div className='row mt-3' key={index}>
                                        <div className='col-2'>
                                            <Link to={`/${user._id}`}> <img src={user.avatar} alt='pp' id='havatar'/></Link>
                                        </div>
                                        <div className="col-6" >
                                            <Link to={`/${user._id}`} style={{textDecoration:'none',color:'black'}}>{`${user.fname} ${user.lname}`}</Link>
                                            <div style={{marginTop:'-1vh',color:'gray',fontSize:'2.3vh'}}>@{user._id}</div>
                                        </div>
                                        <div className="col-4">
                                            <UserStatus user={user}/>
                                        </div>
                                    </div>
                                )
                            }
                            else{
                                return <div key={index}></div>
                            }
                        })
                        
                    }
                    </div>
                </>:
                <Loading/>
            }
        </div>
    );
}

export default UserList;
