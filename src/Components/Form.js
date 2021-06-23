import React,{useEffect,useState} from 'react';
import classes from './Form.module.css';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {getTasks,createTask,deleteTask,updateTask} from '../Actions/index';
import Tasks from './Tasks/Tasks';
import { BsPlus,BsTrashFill } from "react-icons/bs";
import {BiMinus} from 'react-icons/bi';
function Form() {
    const [users,setUsers]=useState([]);
    const [token,setToken]=useState('');
    const [userId,setUserId]=useState('');
    const [currentId,setCurrentId]=useState(null);
    const [description,setDescription]=useState('');
    const [time,setTime]=useState('');
    const [tasksCount,setTasksCount]=useState(0);
    const [showForm,setShowForm]=useState(false);
    let timeZone=Math.abs(new Date().getTimezoneOffset()*60);
    const initialState={
        assigned_user:'',task_date:'',task_time:'',is_completed:1,time_zone:timeZone,task_msg:''
    }
    const [taskData,setTaskData]=useState(initialState);
    const dispatch=useDispatch();
    const body={
        email:"smithcheryl@yahoo.com",
        password:"12345678"
    }
    const dataTasks = useSelector(state => state);
    const getUsers =()=>{
        axios.post('https://stage.api.sloovi.com/login',body).then(res=>{
        setToken(res.data.results.token);
        const headers = {
            'Authorization': 'Bearer ' + res.data.results.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
          }
        axios.get('https://stage.api.sloovi.com/user',{headers}).then(res=>{
            console.log(res.data.results.user_id);
            setUserId(res.data.results.user_id);
        }).catch(err=> console.log(err))
        axios.get('https://stage.api.sloovi.com/team',{headers}).then(res=>{
                        console.log(res);
                        const users=res.data.results.data.filter(user=> user.user_status==='accepted');
                        setUsers(users);
                    }).catch(err=>{
                        console.log(err)
                    })
    }).catch(err=> console.log(err))
    }
    useEffect(()=>{
        getUsers();
    },[])
    useEffect(()=>{
        if(currentId!==null)
        {
            let tasks=dataTasks.filter(task=>task.id===currentId);
            let task=tasks?.[0];
            setTaskData({
                assigned_user:task.assigned_user,task_date:task.task_date,task_time:task.task_time,is_completed:task.is_completed,time_zone:task.time_zone,task_msg:task.task_msg
            });
            let time=task.task_time%3600
            let hours;
            let minutes;
            if(task.task_time>3600)
                hours=Math.trunc(task.task_time/3600);
            if(time>60)
                minutes=time/60;
            setTime(hours+":"+minutes);
        }
        else{
            setTaskData(initialState);
        }
    },[currentId])
    useEffect(()=>{
        dispatch(getTasks(token,userId));
    },[token,dispatch]);
    const descriptionHandler = (e)=>{
        setTaskData(prevState=> {return {...prevState,task_msg:e.target.value}})
    }
    const dateHandler = (e)=>{
        const date = e.target.value;
        setTaskData(prevState=> {return {...prevState,task_date:date}})
    }
    const timeHandler = (e)=>{
        const time=e.target.value;
        setTime(e.target.value);
        const seconds = Number(time.split(':')[0])*3600+Number(time.split(':')[1])*60;
        console.log(seconds)
        setTaskData(prevState=> {return {...prevState,task_time:seconds}})
    }
    const handlerUser = (e)=>{
        setTaskData(prevState=> {return {...prevState,assigned_user:e.target.value}})
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        if(currentId!==null)
        {
            dispatch(updateTask(token,currentId,taskData));
            setTaskData(initialState);
            setTime('');
            setCurrentId(null);
        }else{
            dispatch(createTask(token,taskData));
            setTaskData(initialState);
            setTime('');
        }
    }
    const showFormHandler = ()=>{
        setShowForm(true);
    }
    const onCancel=()=>{
        setShowForm(false);
        setTaskData(initialState);
        setTime('');
        setCurrentId(null);
    }
    return (
        <div className={classes.FormDiv}>
            <div className={classes.TaskHeader}>
                <span>Tasks {tasksCount}</span>
                <span style={{float:"right",cursor:"pointer"}}>{showForm?<BiMinus size="20px" onClick={onCancel}/>:<BsPlus size="20px" onClick={showFormHandler}/>}</span>
            </div>
            {showForm&&<form className={classes.Form} onSubmit={submitHandler}>
                <div className={`${classes.EachDiv}`}>
                    <label>Task Description</label>
                    <input value={taskData.task_msg} className={`${classes.EachInput}`} type="text" onChange={descriptionHandler}></input>
                </div>
                <div className={`${classes.EachDiv} ${classes.DateTime}`}>
                    <div className={`${classes.DateInput}`}>
                        <label>Date</label>
                        <input value={taskData.task_date} className={`${classes.EachInput}`} type="date" onChange={dateHandler}></input>
                    </div>
                    <div className={`${classes.TimeInput}`}>
                        <label>Time</label>
                        <input value={time} className={`${classes.EachInput}`} type="time" onChange={timeHandler}></input>
                    </div>
                </div>
                <div className={`${classes.EachDiv}`}>
                    <label>Assign User</label>
                    <select value={taskData.assigned_user} className={`${classes.EachInput}`} onChange={handlerUser}>
                        <option value="">Select</option>
                        {console.log(users)}
                        {users.map(user=> <option value={user.user_id}>{user.name}</option>)}
                    </select>
                </div>
                <div className={classes.BtnsDiv}>
                    {currentId&&<BsTrashFill size="20px" cursor="pointer" onClick={()=>{dispatch(deleteTask(token,currentId));setTaskData(initialState);setCurrentId(null)}}/>}
                    <div>
                        <button type="button" className={classes.BtnCancel} onClick={onCancel}>Cancel</button>
                        <button className={classes.BtnSave} onClick={submitHandler}>{currentId?'Update':'Save'}</button>
                    </div>
                </div>
            </form>
            }
            <Tasks userId={userId} currentId={currentId} setCurrentId={setCurrentId} setTasksCount={setTasksCount} setShowForm={setShowForm}/>
        </div>
    )
}

export default Form
