const initialState= localStorage.getItem("_syt2022_")!==null? true:false

const userLogin=(state=initialState,action)=>{
    if(action.type==="user"){
        return action.payload
    }
    return state
}

export default userLogin