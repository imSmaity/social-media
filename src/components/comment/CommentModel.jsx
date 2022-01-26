import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { upload } from "../../redux/actions"


function CommentModel({post}){
    const [currentComment,setCurrentComment]=useState('')
    const dispatch=useDispatch()
    
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

    return(
        <>
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">Comment</h5>
                    </div>
                    <div className="modal-body">
                        {
                            post.comments.map((val,index)=>{
                                return(
                                    <div className="row" key={index}>
                                        <div className="col-2">
                                            <img src={val.commentUserAvatar} alt="pp"/>
                                        </div>
                                        <div className='col-10 mt-2'>
                                            <div>
                                                {val.commentUserName}
                                                <span>{`@${val.commentUserUId}`}</span>
                                            </div>
                                            <div>{val.comment}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="input-group mb-3 mt-5">
                            <input type="text" value={currentComment}  className="form-control" id="exampleFormControlInput1" placeholder="Type your comment here..." onChange={commentHandle}/>
                            <button type="button" onClick={()=>comment(post)}>Comment</button>
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