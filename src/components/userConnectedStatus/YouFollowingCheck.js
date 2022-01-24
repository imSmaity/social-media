import axios from "axios"

export function YouFollowing(user,uid){
    let status=false

    axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid:uid})
    .then((res)=>{
        if(res.data!==''){
            for(let i=0;i<res.data.following.length;i++){
                if(res.data.following[i]===user._id){
                    status=true
                    i=res.data.following.length
                }
            }
        }
    })
    return status
}