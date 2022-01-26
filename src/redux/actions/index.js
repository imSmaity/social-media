export const loginUpdate=()=>{
    return {
        type:'user',
        payload:true
    }
}
export const logout=()=>{
    return {
        type:'user',
        payload:false
    }
}

export const upload=()=>{
    return {
        type:'post',
        update: Math.random()
    }
}