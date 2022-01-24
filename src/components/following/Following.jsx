import React from 'react';
import { Link } from 'react-router-dom';
import { UserStatus } from '../components';


function Following({loading,users,following}) {

    return (
        <>
            {
                loading?
                users.map((user,index)=>{
                    for(let i=0;i<following.length;i++){
                        if(following[i]===user._id){
                            i=following.length
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

export default Following;
