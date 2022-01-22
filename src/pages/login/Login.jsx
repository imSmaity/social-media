import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { loginUpdate } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [loginData,setLoginData]=useState({uid:'',password:''})
    const dispatch= useDispatch()
    const navigate=useNavigate()

    function inputHandle(e){
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }

    function login(){
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid:loginData.uid})
        .then((res)=>{
            if(res.data!==''){
                if(res.data.password===loginData.password){
                    localStorage.setItem("_syt2022_",JSON.stringify(
                        {fname:res.data.fname,lname:res.data.lname,uid:res.data._id,avatar:res.data.avatar,
                        bio:res.data.bio,following:res.data.following,followers:res.data.followers}
                    ))
                    dispatch(loginUpdate())
                    navigate(-1)
                }
                else{
                    alert("Wrong email or password. Try agein.")
                }
                
            }
            else{
                alert("Wrong email or password. Try agein.")
            }
        })
    }
  return (
        <div className='row'>
            <div className="col-md-4 col-1"></div>
            <center className="col-md-4 col-10">
                <h3 className='mt-5'>Login</h3>
                <input type={'text'} name='uid' className='mt-3' placeholder='Username' onChange={inputHandle}/>
                <input type={'password'} name='password' className='mt-3' placeholder='Password'  onChange={inputHandle}/>
                <div className='mt-4'>
                    <button type='button' onClick={login}>Login</button>
                </div>
            </center>
            <div className="col-md-4 col-1"></div>
        </div>
    )
}

export default Login;