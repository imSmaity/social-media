
function LikeModel({likes}){
    return(
        <>
            <div className="modal fade" id="exampleModalToggleLike" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">Likes</h5>
                    </div>
                    <div className="modal-body">
                    {
                        likes.map((val,index)=>{
                            return(
                                <div className="row" key={index}>
                                    <div className="col-2">
                                        <img src={val.likesUserAvatar} alt="pp"/>
                                    </div>
                                    <div className='col-10 mt-2'>
                                        <div>
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