import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UserStatus({user}) {
    const [youFollowed,setYouFollowed]=useState(false)
    const [loadList,setLoadList]=useState(1)
    const UID=JSON.parse(localStorage.getItem('_syt2022_')).uid
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

    function following(user){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        userData.following.push(user._id)
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/follow_unfollow`,{state:'follow',userData,FollowedId:user._id})
        .then(()=>{
            localStorage['_syt2022_']=JSON.stringify(userData)
            setLoadList(loadList+1)
        })
    }
    function unfollow(user){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        userData.following.splice(userData.following.indexOf(user._id),1)
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/follow_unfollow`,{state:'unfollow',userData,UnfollowedId:user._id})
        .then(()=>{
            localStorage['_syt2022_']=JSON.stringify(userData)
            setLoadList(loadList+1)
        })
    }
    
    return (
        <>
            {
                UID!==user._id?
                youFollowed?
                <button type='button' onClick={()=>unfollow(user)}>Following</button>:
                <button type='button' onClick={()=>following(user)}>Follow</button>:
                <div></div>

            }
        </>
  
    );
}
