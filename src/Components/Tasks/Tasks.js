import React from 'react'
import {useDispatch,useSelector} from 'react-redux';
import classes from './Tasks.module.css';
import { BsPencil } from "react-icons/bs";

function Tasks({userId,currentId,setCurrentId,setTasksCount,setShowForm}) {
    console.log()
    const dataTasks = useSelector(state => state);
    const data = dataTasks.filter(task=>task.assigned_user===userId);
    setTasksCount(data.length)
    const EditData=(id)=>{
        setCurrentId(id);
        setShowForm(true);
    }
    return (
        <div className={classes.TasksDiv}>
            {dataTasks.map(task=>
                task.assigned_user===userId&&(
                    <div className={classes.EachTile}>
                        <div className={classes.FlexClass}>
                            <div>Follow up</div>
                            <div>{task.task_date}</div>
                        </div>
                        <BsPencil cursor="pointer" size="20px" onClick={()=>EditData(task.id)}/>
                    </div>
                )
            )}
        </div>
    )
}

export default Tasks
