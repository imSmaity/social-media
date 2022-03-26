import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Loading, PostLayout, UserStatus } from '../../components/components';
import { upload } from '../../redux/actions';
import EditProfile from './EditProfile';
import './profile.css'

function Profile() {
	const [userData,setUserData]=useState(null)
	const [updateData,setUpdateData]=useState({fname:'',lname:'',bio:'',dob:''})
	const [loading,setLoading]=useState(false)
	const dispatch=useDispatch()
	const state=useSelector((state)=>state.updateRefresh)

	const uid=useParams().uid
	const localUId=JSON.parse(localStorage.getItem('_syt2022_')).uid
	
	useEffect(()=>{
		axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid})
		.then((res)=>{
		setUserData(res.data)
		setUpdateData({fname:res.data.fname,lname:res.data.lname,bio:res.data.bio,dob:res.data.dob})
		setLoading(true)
		})
	},[uid,state])

	function handleInput(e){
		setUpdateData({...updateData,[e.target.name]:e.target.value})
	}
	function updateProfile(){
		
		axios.post(`${process.env.REACT_APP_USER_SIGNUP}/user_update`,{uid:localUId,data:updateData})
		.then(()=>{
			dispatch(upload())
		})

	}
  return(
    <>
	{
		loading?
		<>
			
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
									className='btn btn-outline-primary btn-sm'
									style={{height:'5vh',borderRadius:'5vh'}} 
									data-bs-toggle="modal" 
									href="#exampleModalToggleEditProfile" 
								>
									Edit Profile
								</button>
							</>:
							<UserStatus user={userData}/>
						}
						
					</div>
					<div className='col-12'>{`${userData.fname} ${userData.lname}`}</div>
					<div className='col-12' style={{marginTop:'-1vh',color:'gray',fontSize:'2.5vh'}}>{`@${uid}`}</div>
					<div className='col-12'>{userData.bio}</div>
					<div className='col-12' >
						<Link to={`/${userData._id}/following`} style={{textDecoration:'none',color:'black'}}>{`${userData.following.length} Following`}</Link>
						<span style={{marginLeft:'6px'}}>
							<Link to={`/${userData._id}/followers`} style={{textDecoration:'none',color:'black'}}>{`${userData.followers.length} Followers`}</Link>
						</span>
					</div>
				</div>
				<div className='fs'>
					<PostLayout posts={userData.postsData} postLoading={loading}/>
				</div>
			</div>
		</>:
		<div className='col-6'><Loading/></div>
	}
      
	</>
  ) ;
}

export default Profile;
