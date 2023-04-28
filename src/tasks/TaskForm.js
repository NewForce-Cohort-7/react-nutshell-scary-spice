import { useNavigate } from "react-router-dom"
import { useState} from "react"
import {Button, Form} from 'react-bootstrap';

// passing the taskSubmitted function to the form to update it live 
export const TaskForm = ( { taskSubmitted }, {toggleAddTaskForm} ) => {

    /*
        TODO: Add the correct default properties to the
        initial state object
    */

    const [task, update] = useState({
        task:"",
        dueDate: "",
        complete:false
    })

    const [shouldRefresh,setShouldRefresh ] = useState(false);



    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the task list
    */

    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const taskToSendToAPI = {
            userId:nutshellUserObject.id,
            task:task.task,
            dueDate:task.dueDate,
            complete:false
        }

        // TODO: Perform the fetch() to POST the object to the API
         fetch(`http://localhost:8088/tasks`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(taskToSendToAPI)
        })
        .then(response => response.json())
        .then(()=>{
            taskSubmitted()
        })

        .then(()=>{
            update({task:"",
            dueDate: "",
            complete:false})
          
        })
        .then(()=>{
            toggleAddTaskForm()
        })
    }

    

    return (
        <>
       
        <form className="taskForm">
            <h2 className="taskForm__title">New Task</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="task">Task:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of task"
                        value={task.task}
                        onChange={
                            (evt) =>{
                              const copy = {...task}
                              copy.task = evt.target.value
                              update(copy)
                            }
                            } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">DueDate:</label>
                    <input type="date"
                        value={task.dueDate}
                        onChange={
                            (evt) =>{
                              const copy = {...task}
                              copy.dueDate = evt.target.value
                              update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <Button 
                variant="success" 
                bsPrefix="submit-task-button"
                onClick={(clickEvent) =>{handleSaveButtonClick(clickEvent)}}>
                Submit Task
            </Button>

            
        </form>
        </>
    )
}

