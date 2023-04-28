import { useNavigate } from "react-router-dom"
import { useState} from "react"
import {Button, Form} from 'react-bootstrap';

// passing the taskSubmitted function to the form to update it live 
export const TaskForm = ( { taskSubmitted, toggleAddTaskForm}) => {

    /*
        TODO: Add the correct default properties to the
        initial state object
    */

    const [task, update] = useState({
        task:"",
        dueDate: "",
        complete:false
    })

    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the task list
    */

    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)
    
    const handleSubmitButtonClick = (event) => {
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
        
        <Form>
              
            <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">New Task:</Form.Label>
            <Form.Control
                type="text"
                required
                value={task.task}
                onChange={
                    (evt) =>{
                      const copy = {...task}
                      copy.task = evt.target.value
                      update(copy) }}
                placeholder="Brief description of task"
            />
            </Form.Group>
        
            <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Due Date:</Form.Label>
            <Form.Control
                type="date"
                required
                value={task.dueDate}
                onChange={
                    (evt) =>{
                      const copy = {...task}
                      copy.dueDate = evt.target.value
                      update(copy)}} 
                placeholder="Enter Due Date"
            />
            </Form.Group>
        
            <Button 
            variant="success" 
            bsPrefix="submit-task-button"
            onClick={(clickEvent) =>{handleSubmitButtonClick(clickEvent)}}>
            Submit Task
            </Button>
        
        </Form> 
    )
}

