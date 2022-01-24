import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserStatus, YourFollowers } from '../components';



function Followers({loading,users,followers}) {

    return (
        <>
            {
                loading?
                users.map((user,index)=>{
                    for(let i=0;i<followers.length;i++){
                        if(followers[i]===user._id){
                            i=followers.length
                            return(
                                <div className='row mt-3' key={index}>
                                    <div className='col-2'>
                                        <Link to={`/${user._id}`}> <img src={user.avatar} alt='pp' id='havatar'/></Link>
                                    </div>
                                    <div className="col-6">
                                        <Link to={`/${user._id}`}>{`${user.fname} ${user.lname}`}</Link>
                                        <div>{user._id}</div>
                                    </div>
                                    <div className="col-4">
                                        <UserStatus user={user}/>
                                    </div>
                                </div>
                            )
                        }
                    }
                }):
                <div>Loading...</div>
            }
        </>
    );
}

export default Followers;
