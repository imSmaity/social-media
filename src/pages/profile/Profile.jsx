import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Search } from '../../components/components';
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
	},[])
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
					<center>
						<div className='col-12' id='coverP'>{`${userData.fname.toUpperCase()}`}</div>
						<div className='col-12 ppp mt-3'>
							
								<img src={userData.avatar} alt='pp' />
							
						</div>
						<div className='col-12'>{`${userData.fname} ${userData.lname}`}</div>
						<div className='col-12'>{`${uid}`}</div>
					</center>
				</div>
			</div>
			<div className='col-3'>
				<Search/>
				<p>Who to follow</p>
			</div>
		</>:
		<div>Loading...</div>
	}
      
	</div>
  ) ;
}

export default Profile;
