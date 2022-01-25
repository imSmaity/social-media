import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { CommentModel, LikeModel, Loading } from '../components';

function userLikeState(post){
    let like=false
    const UID=JSON.parse(localStorage.getItem('_syt2022_')).uid
    for(let i=0;i<post.likes.length;i++){
        if(post.likes[i].likesUserUId===UID){
            like=true
            i=post.likes.length
        }
    }
    return like
}


function PostLayout({posts,postLoading}) {
    
    function like(post){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/like_update`,
        {
            postId:post._id,
            likesUserName:`${userData.fname} ${userData.lname}`,
            likesUserUId: userData.uid,
            likesUserAvatar: userData.avatar
        })
        .then((res)=>{
            console.log(res.data)
        })
    }
    function unlike(post){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/unlike`,
        {
            postId:post._id,
            likes: post.likes,
            likesUserUId: userData.uid,
        })
        .then((res)=>{
            console.log(res.data)
        })
    }
    
    return (
        <>
            {
                postLoading?
                posts.map((post,index)=>{
                return(
                    <div className='row mt-3' key={index}>
                    <div className='col-2'>
                        <img src={post.uploderAvatar} alt='pp'/>
                    </div>
                    <div className='col-10 mt-2'>
                        <div>
                        {post.uploderName}
                        <span>{`@${post.uploderUId}`}</span>
                        </div>
                        <div>{post.post}</div>
                    </div>
                    <div className='col-12 mt-3'>
                        <center className='row'>
                            <div className='col-6'>
                                <LikeModel likes={post.likes}/>
                                
                                <u data-bs-toggle="modal" href="#exampleModalToggleLike" style={{marginRight:'2vh',color:'deepskyblue'}} role="button">{post.likes.length}</u>
                                {
                                    userLikeState(post)?
                                    <button type='button' className="btn btn-dark" onClick={()=>unlike(post)}>
                                        Unlike
                                    </button>:
                                    <button type='button' className="btn btn-dark" onClick={()=>like(post)}>
                                        Like
                                    </button>
                                }
                                
                            </div>
                            <div className='col-6'>
                                <CommentModel post={post}  />
                                <button type='button' className="btn btn-dark" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Comment</button>
                            </div>
                        </center>
                    </div>
                    </div>
                )
                }):
                <Loading/>
            }
        </>

    );
}

export default PostLayout;
