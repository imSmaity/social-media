
const initialState= ''

const updateRefresh=(state=initialState,action)=>{
    if(action.type==="post"){
        return action.update
    }
    return state
}

export default updateRefresh