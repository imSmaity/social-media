import React from 'react';
import { Link } from 'react-router-dom';
import './postWrite.css'

function Write(){
    return(
        <div className='input-group mb-3'>
            <textarea type={'text'} className='form-control poi' id="exampleFormControlTextarea1" rows="3" placeholder={`What's happening?`}></textarea>
        </div>
    )
}

function PostWrite() {
    const avatar=JSON.parse(localStorage.getItem('_syt2022_')).avatar
    const UID=JSON.parse(localStorage.getItem('_syt2022_')).uid
  return (
    <div className='row bb mt-3'>
        <div className='col-1'>
            <Link to={`/${UID}`}>
                <img src={avatar} id='havatar' alt='PP'/>
            </Link>
        </div>
        <div className='col-11'>
            <Write/>
            <button type='button' className='float-end mb-3 post'>Post</button>
        </div>
    </div>
  );
}

export default PostWrite;
