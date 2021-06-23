import * as api from '../APIs/index';
export const getTasks=(token,userId)=>async (dispatch)=>{
    try {
        debugger;
        const {data} = await api.fetchTasks(token,userId);
        dispatch({type:'FETCH_ALL',payload:data.results})
    } catch (error) {
        console.log(error.message);
    }
}

export const createTask=(token,task)=>async (dispatch)=>{
    debugger;
    try {
        const data=await api.createTask(token,task)
        dispatch({type:'CREATE',payload:data.data.results})
    } catch (error) {
        console.log(error)
    }
}

export const updateTask=(token,id,task)=>async (dispatch)=>{
    debugger;
    try {
        const data=await api.updateTask(token,id,task)
        if(data.status===200)
            dispatch({type:'UPDATE',payload:data.data.results})
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask=(token,id)=>async (dispatch)=>{
    debugger;
    try {
        const data=await api.deleteTask(token,id)
        if(data.status===200)
            dispatch({type:'DELETE',payload:id})
    } catch (error) {
        console.log(error)
    }
}