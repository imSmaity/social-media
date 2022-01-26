import React from 'react';

export default function EditProfile({updateProfile,handleInput,updateData}) {
  return (
       <>
           <div className="modal fade" id="exampleModalToggleEditProfile" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">Edit Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                        <input type="text" name='fname' value={updateData.fname} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInput}/>
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                        <input type="text" name='lname' value={updateData.lname} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInput}/>
                        <label htmlFor="exampleInputEmail1" className="form-label">Bio</label>
                        <input type="text" name='bio' value={updateData.bio} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInput}/>
                        <label htmlFor="exampleInputEmail1" className="form-label">Birth date</label>
                        <input type="date" name='dob' value={updateData.dob} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInput}/>
                        
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={updateProfile}>Save</button>
                    </div>
                    </div>
                </div>
            </div>
       </>
    );
}
