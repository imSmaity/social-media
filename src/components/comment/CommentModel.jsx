import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { upload } from "../../redux/actions"
import { Loading } from "../components"


function CommentModel({post}){
    const [currentComment,setCurrentComment]=useState('')
    const dispatch=useDispatch()
    const [loading,setLoadign]=useState(false)
    const userData=JSON.parse(localStorage.getItem('_syt2022_'))

    function commentHandle(e){
        setCurrentComment(e.target.value)
    }
    function comment(post){
        const userData=JSON.parse(localStorage.getItem('_syt2022_'))
        if(currentComment!==''){
            axios.post(`${process.env.REACT_APP_USER_SIGNUP}/comment_update`,
            {
                postId: post._id,
                comment: currentComment,
                commentUserName: `${userData.fname} ${userData.lname}`,
                commentUserUId: userData.uid,
                commentUserAvatar: userData.avatar
            })
            .then(()=>{
                setCurrentComment('')
                dispatch(upload())
            })
        }
    }
    
    function deleteComment(index){
        axios.post(`${process.env.REACT_APP_USER_SIGNUP}/delete_comment`,{postId:post._id,index})
        .then(()=>{
            dispatch(upload())
            setLoadign(false)
        })
    }
    return(
        <>
            <div className="modal fade" id={`exampleModalToggle${post._id}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">Comments</h5>
                    </div>
                    <div className="modal-body">
                        {
                            post.comments.map((val,index)=>{
                                return(
                                    <div className="row" key={index}>
                                        <div className="col-2 pps">
                                            <img src={val.commentUserAvatar} alt="pp"/>
                                        </div>
                                        <div className='col-8 mt-2'>
                                            <div className="sp" style={{textAlign:'left'}}>
                                                {val.commentUserName}
                                                <span>{`@${val.commentUserUId}`}</span>
                                            </div>
                                            <div style={{textAlign:'left'}}>{val.comment}</div>
                                        </div>
                                        <div className="col-2 dropdown" style={{display:userData.uid===val.commentUserUId?'inline':'none'}}>
                                            <button type='button' className=" dotIcon">...</button>
                                            {
                                                !loading?
                                        
                                                <div className="dropdown-content" 
                                                    onClick={()=>{
                                                        setLoadign(true)
                                                        deleteComment(index)
                                                    }
                                                }>
                                                    <div className='link'>Delete Comment</div>
                                                </div>:
                                                
                                                <div className="dropdown-content" >
                                                    <div className='link'><Loading/></div>
                                                </div>
                                            
                                            } 
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="input-group mb-3 mt-5">
                            <input type="text" value={currentComment}  className="form-control" id="exampleFormControlInput1" placeholder="Type your comment here..." onChange={commentHandle}/>
                            <button type="button" disabled={currentComment===''?true:false} onClick={()=>comment(post)}>Comment</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentModel