
function LikeModel({post}){
    return(
        <>
            <div className="modal fade" id={`exampleModalToggleLike${post._id}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">Likes</h5>
                    </div>
                    <div className="modal-body">
                    {
                        post.likes.map((val,index)=>{
                            return(
                                <div className="row" key={index}>
                                    <div className="col-2 pps">
                                        <img src={val.likesUserAvatar} alt="pp"/>
                                    </div>
                                    <div className='col-10 mt-2'>
                                        <div className="sp" style={{textAlign:'left'}}>
                                            {val.likesUserName}
                                            <span>{`@${val.likesUserUId}`}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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

export default LikeModel