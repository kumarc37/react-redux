import axios from 'axios';

const API = axios.create({baseURL:"https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38"})

export const fetchTasks =(token,userId)=>{
    if(token)
    {
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
          }
        const data=axios.get('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',{headers})
        return data;
    }
}
export const createTask =(token,task)=>{
    if(token)
    {
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
          }
        const data=axios.post('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',task,{headers})
        return data;
    }
}

export const updateTask = (token,id,task)=>{
    if(token)
    {
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
          }
        const data=axios.put(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${id}`,task,{headers})
        return data;
    }
}

export const deleteTask = (token,id)=>{
    if(token)
    {
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
          }
        const data=axios.delete(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${id}`,{headers})
        return data;
    }
}