import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { loginUpdate } from '../../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import {Loading} from '../../components/components'

function Login() {
    const [loginData,setLoginData]=useState({uid:'admin',password:'admin'})
    const [load,setLoad]=useState(false)
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
                    setLoad(false)
                    navigate('/')
                }
                else{
                    setLoad(false)
                    alert("Wrong username or password. Try agein.")
                }
                
            }
            else{
                setLoad(false)
                alert("Wrong username or password. Try agein.")
            }
        })
    }
  return (
        <>
            <div className="col-md-4 col-1"></div>
            <center className="col-md-4 col-10">
                <h3 className='mt-5'>Login</h3>
                <input type={'text'} name='uid' value={loginData.uid} className='mt-3' placeholder='Username' onChange={inputHandle}/><br/>
                <input type={'password'} name='password' value={loginData.password} className='mt-3' placeholder='Password'  onChange={inputHandle}/><br/>
                <Link to={'/forgot_password'}>
                    Forgot Password?
                </Link>
                <div className='col-12'>
                    Don't have an account? <Link to={'/signup'}>Sign up</Link>
                </div>
                <div className='mt-4'>
                {
                    !load?
                    <button type='button' onClick={()=>{
                        setLoad(true)
                        login()
                    }}>Login</button>:
                    <button><Loading/></button>
                }
                    
                </div>
            </center>
            <div className="col-md-4 col-1"></div>
        </>
    )
}

export default Login;
