import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, PostLayout, UserList } from '../../components/components';
import './profile.css'

function Profile() {
	const [userData,setUserData]=useState(null)
	const [loading,setLoading]=useState(false)
	const uid=useParams().uid
	useEffect(()=>{
		axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid})
		.then((res)=>{
		setUserData(res.data)
		setLoading(true)
		})
	},[uid])
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
					<div className='col-12 ppp mt-3'>
						
							<img src={userData.avatar} alt='pp' />
						
					</div>
					<div className='col-12'>{`${userData.fname} ${userData.lname}`}</div>
					<div className='col-12'>{`${uid}`}</div>
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
