
export function YouFollowing(user){
    let status=false

    const userData=JSON.parse(localStorage.getItem('_syt2022_'))
    for(let i=0;i<userData.following.length;i++){
        if(userData.following[i]===user._id){
            status=true
            i=userData.following.length
        }
    }
    return status
}