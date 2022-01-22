import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UserStatus({user}) {
    const [youFollowed,setYouFollowed]=useState(false)
    const [loadList,setLoadList]=useState(1)

    useEffect(()=>{
        setYouFollowed(false)
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        for(let i=0;i<userData.following.length;i++){
            if(userData.following[i]===user._id){
                setYouFollowed(true)
                i=userData.following.length
            }
        }
    },[user,loadList])

    function following(){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        userData.following.push(user._id)
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/user_update`,userData)
        .then(()=>{
            localStorage['_syt2022_']=JSON.stringify(userData)
            setLoadList(loadList+1)
        })
    }
    function unfollow(){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        userData.following.splice(userData.following.indexOf(user._id),1)
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/user_update`,userData)
        .then(()=>{
            localStorage['_syt2022_']=JSON.stringify(userData)
            setLoadList(loadList+1)
        })
    }
    
    return (
        <>
            {
                youFollowed?
                <button type='button' onClick={unfollow}>Following</button>:
                <button type='button' onClick={following}>Follow</button>

            }
        </>
  
    );
}
