import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function setNewData(userData,newPassword,navigate){
    axios.post(`${process.env.REACT_APP_USER_SIGNUP}/user_update`,{
        uid:userData._id,
        data:{
            _id:userData._id,
            fname:userData.fname,
            lname:userData.lname,
            gender:userData.gender,
            email:userData.email,
            dob:userData.dob,
            password:newPassword,
            avatar:userData.avatar,
            bio:userData.bio,
            posts:userData.posts,
            following:userData.following,
            followers:userData.followers
        }
    })
    .then(res=>{
        if(res.data.success){
            alert("Your password has been reset successfully")
            navigate('/login')
        }
    })

}



export default function ForgotPassword() {
    const [validUser,setValidUser]=useState(false)
    const [userData,setUserData]=useState("")
    const navigate=useNavigate()
    const uid=useRef(null)
    const dob=useRef(null)
    const password=useRef(null)
    const rePassword=useRef(null)

    function findUser(){
        if(uid.current.value!=="" && dob.current.value!==""){
            axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid:uid.current.value})
            .then(
                (res)=>{
                    if(res.data!==""){
                        if(res.data.dob===dob.current.value){
                            setUserData(res.data)
                            setValidUser(true)
                        }
                        else{
                            alert("Your uid or date of birth is incorrect, please try again.")
                        }
                    }
                    else{
                        alert("Your uid or date of birth is incorrect, please try again.")
                    }
                }
            )
        }
        else{
            alert("please fill all the input fields!")
        }
    }
    
    function setNewPassword(){
        if(password.current.value!=="" && rePassword.current.value!==""){
            if(password.current.value===rePassword.current.value){
                setNewData(userData,password.current.value,navigate)
            }
            else{
                alert('Re-entered password are wrong!')
            }
        }
        else{
            alert("please fill all the input fields!")
        }
    }

    return (
        <div>
            <center>
                <h3 >Social Gold</h3>
                {!validUser?
                    <>
                        <div className='mt-5'>
                            <label>Username </label>
                            <input type="email" ref={uid}/>
                        </div>
                        <div className='mt-2'>
                            <label>What is your date of birth?</label>
                            <input type="date" ref={dob}/>
                        </div>
                        <div className='mt-3'>
                            <button type="button" className="btn btn-primary btn-sm" onClick={findUser}>Check</button>
                        </div>
                    </>:
                    <>
                        <div className='mt-5'>
                            <label>New Password:</label>
                            <input type="password" ref={password} />
                        </div>
                        <div className='mt-2'>
                            <label>Re-enter Password:</label>
                            <input type="text" ref={rePassword} />
                        </div>
                        <div className='mt-3'>
                            <button type="submit" className="btn btn-dark btn-sm" onClick={setNewPassword}>Submit</button>
                        </div>
                    </>
                }
                
            </center>
        </div>
    )
}
