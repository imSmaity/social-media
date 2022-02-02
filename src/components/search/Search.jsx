import React from 'react';

export default function Search({allUser,setUsers}) {
    function search(e){
        const searchingWords=e.target.value
        const filteredUsers=allUser.filter((user)=>{
            let find=false
            for(let i=0;i<searchingWords.length;i++){
                if(user._id[i]===searchingWords[i]){
                    find=true
                }
                else{
                    find=false
                    i=searchingWords.length
                }
            }
            return find
        })
        if(e.target.value===''){
            setUsers(allUser)
        }
        else{
            setUsers(filteredUsers)
        }
        
    }

    return (
        <div className='mt-1'>
            <input type={'search'} id='search' placeholder=' Enter username' onChange={(e)=>search(e)}/>
        </div>
    );
}
