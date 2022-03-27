import React from 'react';
import {Input} from '../../components/components'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const inputAttribute=[
	{
		type:'text',
		name:'_id',
		placeholder:'Username'
	},
	{
		type:'text',
		name:'fname',
		placeholder:'First Name'
	},
	{
		type:'text',
		name:'lname',
		placeholder:'Last Name'
	},
	{
		type:'select',
		name:'gender',
		placeholder: 'Gender'
	},
	{
		type:'email',
		name:'email',
		placeholder:'Email'
	},
	{
		type:'date',
		name:'dob',
		placeholder:'Date Of Birth'
	},
	{
		type:'password',
		name:'password',
		placeholder:'Password'
	},
	{
		type:'password',
		name:'rePassword',
		placeholder:'Re-enter Password'
	},
]

function Signup() {
	const [userData,setUserData]=useState({_id:'',fname:'',lname:'',gender:'',email:'',dob:'',password:'',rePassword:''})
	const navigate=useNavigate()

	function handleInput(e){
		setUserData({...userData,[e.target.name]:e.target.value})
	}
	function signup(){

		axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid:userData._id})
		.then(res=>{ 
			if(res.data===""){
				axios.post(`${process.env.REACT_APP_USER_SIGNUP}/signup`,{userData})
				.then(()=>{
					navigate('/login')
				})
			}
			else{
				alert(userData._id+" already used, try another username")
			}
		})
        

		
		
	}
  return( 
		<>
			<center>
				<h3 className='col-12 mt-3'>Sign Up</h3>
				<div className='col-md-4 col-1'></div>
				{
					inputAttribute.map((val,index)=>{
						return(
							<div className='col-md-4 col-10 mt-3' key={index}>
								<Input
									type={val.type}
									name={val.name}
									placeholder={val.placeholder}
									onChange={(e)=>handleInput(e)}
									style={{width:'32vh'}}
								/>
							</div>
						)
					})
				}
				<div className='mt-4'>
					<button type='button' onClick={signup}  className='btn btn-dark btn-sm'>Submit</button>
				</div>
				<div className='col-md-4 col-1'></div>
			</center>
		</>
  	);
}

export default Signup;
