import React from 'react';
import { Loading } from '../components';

function PostLayout({posts,postLoading}) {
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
                            <button type='button'>Like</button>
                            </div>
                            <div className='col-6'>
                            <button type='button'>Comment</button>
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
