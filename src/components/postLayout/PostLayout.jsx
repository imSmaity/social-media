import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { upload } from '../../redux/actions';
import { CommentModel, LikeModel, Loading } from '../components';
import './postLayout.css'


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
    const dispatch=useDispatch()
    const [loading,setLoadign]=useState(false)
    const [loadingLike,setLoadingLike]=useState('')
    const userData=JSON.parse(localStorage.getItem('_syt2022_'))

    function like(post){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))

        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/like_update`,
        {
            postId:post._id,
            likesUserName:`${userData.fname} ${userData.lname}`,
            likesUserUId: userData.uid,
            likesUserAvatar: userData.avatar
        })
        .then(()=>{
            setLoadingLike('')
            dispatch(upload())
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
        .then(()=>{
            setLoadingLike('')
            dispatch(upload())
        })
    }
    function deletePost(postId){

        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/delete_post`,{postId,uid:userData.uid})
        .then(()=>{
            dispatch(upload())
            setLoadign(false)
        })
        
    }
    return (
        <>
            {
                postLoading?
                posts.map((post,index)=>{
                return(
                    <div className='row mt-3 pbtnD' key={index}>
                    <Link to={`/${post.uploderUId}`} className='col-2 pps'>
                        <img src={post.uploderAvatar} alt='pp'/>
                    </Link>
                    <div className='col-8 mt-2'>
                        <Link to={`/${post.uploderUId}`} className='sp'>
                            {post.uploderName}
                            <span>{`@${post.uploderUId}`}</span>
                        </Link>
                        <div>{post.post}</div>
                    </div>
                    <div className="col-2 dropdown" style={{display:userData.uid===post.uploderUId?'inline':'none'}}>
                        <button type='button' className=" dotIcon">...</button>
                        {
                            !loading?
                       
                            <div className="dropdown-content" 
                                onClick={()=>{
                                    setLoadign(true)
                                    deletePost(post._id)
                                }
                            }>
                                <div className='link'>Delete post</div>
                            </div>:
                            
                            <div className="dropdown-content" >
                                <div className='link'><Loading/></div>
                            </div>
                           
                        } 
                        
                    </div>
                    <div className='col-12 mt-3'>
                        <center className='row'>
                            <div className='col-6'>
                                <LikeModel post={post}/>
                                
                                <u data-bs-toggle="modal" href={`#exampleModalToggleLike${post._id}`} style={{marginRight:'2vh',color:'deepskyblue'}} role="button">{post.likes.length}</u>
                                {
                                    loadingLike!==post._id?
                                    userLikeState(post)?
                                    <button 
                                        type='button'  
                                        onClick={()=>{
                                            setLoadingLike(post._id)
                                            unlike(post)
                                        }
                                    }>
                                        Unlike
                                    </button>:
                                    <button 
                                        type='button'  
                                        onClick={()=>{
                                            setLoadingLike(post._id)
                                            like(post)
                                        }
                                    }>
                                        Like
                                    </button>:
                                    <button><Loading/></button>
                                }
                                
                            </div>
                            <div className='col-6'>
                                <CommentModel post={post}  />
                                <button type='button'  data-bs-toggle="modal" href={`#exampleModalToggle${post._id}`}>Comment</button>
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
