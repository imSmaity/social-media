import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {PostLayout} from '../../components/components'

function WhatsHappening() {
    const [posts,setPosts]=useState(null)
    const [postLoading,setPostLoading]=useState(false)
    const state=useSelector((state)=>state.updateRefresh)

    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/all_posts`,{uid:userData.uid,following:userData.following})
        .then((res)=>{
            setPosts(res.data)
            setPostLoading(true)
        })
    },[state])
    
  return (
    <div className='fs'>
      <PostLayout posts={posts} postLoading={postLoading}/>
    </div>
  );
}

export default WhatsHappening;
