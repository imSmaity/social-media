import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './postWrite.css'
import {Loading} from '../components'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { upload } from '../../redux/actions';

function Write({postInputHandle,post}){
    return(
        <div className='input-group mb-3'>
            <textarea 
                type={'text'} 
                className='form-control poi' 
                id="exampleFormControlTextarea1" 
                rows="3" 
                value={post}
                placeholder={`What's happening?`}
                onChange={postInputHandle}
            >
            </textarea>
        </div>
    )
}

function PostWrite() {
    const [post,setPost]=useState("")
    const [postLoading,setPostLoading]=useState(false)
    const dispatch=useDispatch()

    const avatar=JSON.parse(localStorage.getItem('_syt2022_')).avatar
    const userData=JSON.parse(localStorage.getItem('_syt2022_'))

    
    function postInputHandle(e){
        setPost(e.target.value)
    }
    function postSubmit(){
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/posting`,{
            post:post,
            UID:userData.uid,
            uploderName:`${userData.fname} ${userData.lname}`,
            uploderAvatar:userData.avatar
        })
        .then(()=>{
            setPost("")
            setPostLoading(false)
            dispatch(upload())
        })
    }


  return (
    <div className='row bb mt-3'>
        <div className='col-1'>
            <Link to={`/${userData.uid}`}>
                <img src={avatar} id='havatar' alt='PP'/>
            </Link>
        </div>
        <div className='col-11'>
            <Write postInputHandle={(e)=>postInputHandle(e)} post={post}/>
            <button 
                type='button' 
                className='float-end mb-3 post' 
                disabled={post===''?true:false}
                onClick={()=>{
                    setPostLoading(true)
                    postSubmit()
                }}>{postLoading? <Loading/>:'Post'} 
            </button>
        </div>
    </div>
  );
}

export default PostWrite;
