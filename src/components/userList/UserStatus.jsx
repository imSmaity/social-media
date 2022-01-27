import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { upload } from '../../redux/actions';
import { Loading } from '../components';
import './user.css'


export default function UserStatus({user}) {
    const [youFollowed,setYouFollowed]=useState(false)
    const [loadList,setLoadList]=useState(1)
    const [followLoad,setFollowLoad]=useState(false)
    const [unfollowLoad,setUnfollowLoad]=useState(false)
    const dispatch=useDispatch()

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
        setFollowLoad(false)
        setUnfollowLoad(false)
    },[user,loadList])

    function following(user){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        userData.following.push(user._id)
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/follow_unfollow`,{state:'follow',userData,FollowedId:user._id})
        .then(()=>{
            localStorage['_syt2022_']=JSON.stringify(userData)
            setLoadList(loadList+1)
            dispatch(upload())
        })
    }
    function unfollow(user){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        userData.following.splice(userData.following.indexOf(user._id),1)
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/follow_unfollow`,{state:'unfollow',userData,UnfollowedId:user._id})
        .then(()=>{
            localStorage['_syt2022_']=JSON.stringify(userData)
            setLoadList(loadList+1)
            dispatch(upload())
        })
    }
    
    return (
        <>
            {
                UID!==user._id?
                youFollowed?
                <button 
                id='fu'
                    type='button' 
                    style={{height:'6vh'}}
                    onClick={()=>{
                        setUnfollowLoad(true)
                        unfollow(user)
                }}>{unfollowLoad?<Loading/>:'Following'}</button>:
                <button 
                    id='fu'
                    type='button' 
                    style={{height:'6vh'}}
                    onClick={()=>{
                        setFollowLoad(true)
                        following(user) 
                    }}>{followLoad?<Loading/>:'Follow'}</button>:
                <div></div>

            }
        </>
  
    );
}
