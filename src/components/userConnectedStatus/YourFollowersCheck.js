import axios from "axios"

export function YourFollowers(user,uid){
    let status=false

    axios.post(`${process.env.REACT_APP_USER_SIGNUP}/search_user`,{uid:uid})
    .then((res)=>{
        for(let i=0;i<res.data.followers.length;i++){
            if(res.data.followers[i]===user._id){
                status=true
                i=res.data.followers.length
            }
        }
    })
    return status
}