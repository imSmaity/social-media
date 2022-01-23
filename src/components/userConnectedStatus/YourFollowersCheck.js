
export function YourFollowers(user){
    let status=false

    const userData=JSON.parse(localStorage.getItem('_syt2022_'))
    for(let i=0;i<userData.followers.length;i++){
        if(userData.followers[i]===user._id){
            status=true
            i=userData.followers.length
        }
    }
    return status
}