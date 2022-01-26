import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, PostLayout, UserList, UserStatus } from '../../components/components';
import EditProfile from './EditProfile';
import './profile.css'

function Profile() {
	const [userData,setUserData]=useState(null)
	const [updateData,setUpdateData]=useState({fname:'',lname:'',bio:'',dob:''})
	const [loading,setLoading]=useState(false)
	const [update,setUpdate]=useState(0)
	
	const uid=useParams().uid
	const localUId=JSON.parse(localStorage.getItem('_syt2022_')).uid
	
	useEffect(()=>{
		axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid})
		.then((res)=>{
		setUserData(res.data)
		setUpdateData({fname:res.data.fname,lname:res.data.lname,bio:res.data.bio,dob:res.data.dob})
		setLoading(true)
		})
	},[uid,update])

	function handleInput(e){
		setUpdateData({...updateData,[e.target.name]:e.target.value})
	}
	function updateProfile(){
		
		axios.post(`${process.env.REACT_APP_USER_SIGNUP}/user_update`,{uid:localUId,data:updateData})
		.then(()=>{
			setUpdate(Math.random())
		})

	}
  return(
    <div className='row'>
	{
		loading?
		<>
			<div className='col-3 '>
				<img id='icon' src={require('../../Assets/images/dove.png')} alt="Logo" />
				<Navbar/>
			</div>
			<div className='col-md-6 col-12 bsh'>
				<div className='row bb'>
			
					<div className='col-12' id='coverP'>{`${userData.fname.toUpperCase()}`}</div>
					<div className='col-6 ppp mt-3'>
						
							<img src={userData.avatar} alt='pp' />
						
					</div>
					<div className='col-6 ppp mt-1 d-flex justify-content-end'>

						{
							localUId===uid?
							<>
								<EditProfile updateProfile={updateProfile} handleInput={(e)=>handleInput(e)} updateData={updateData}/>
								<button 
									style={{height:'6vh',borderRadius:'3vh',color:'blue'}} 
									data-bs-toggle="modal" 
									href="#exampleModalToggleEditProfile" 
									role="button">
									Edit Profile
								</button>
							</>:
							<UserStatus user={userData}/>
						}
						
					</div>
					<div className='col-12'>{`${userData.fname} ${userData.lname}`}</div>
					<div className='col-12'>{`${uid}`}</div>
					<div className='col-12'>{userData.bio}</div>
					<div className='col-12'>
						<Link to={`/${userData._id}/following`}>{`${userData.following.length} Following`}</Link>
						<span><Link to={`/${userData._id}/followers`}>{`${userData.followers.length} Followers`}</Link></span>
					</div>
				</div>
				<PostLayout posts={userData.postsData} postLoading={loading}/>
			</div>
			<div className='col-3'>
				<UserList/>
			</div>
		</>:
		<div>Loading...</div>
	}
      
	</div>
  ) ;
}

export default Profile;
