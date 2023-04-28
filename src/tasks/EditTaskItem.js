import React, { useState, useEffect } from 'react'
import {Button, Form} from 'react-bootstrap'

export const EditTaskItem=({ task = {task: "", dueDate: ""}, fetchAllTasks, updateTask })=>{
    const [isEditing, setIsEditing] = useState(false)
    const [editTask, setEditTask] = useState(task.task || "") // added the or to prevent undefined error....because initial state doesnt match input value?
    const [editDueDate, setEditDueDate] = useState(task.dueDate || "")
    
  // this will be executed whenever the task changes. it will only when a task object changes 
    useEffect(() => {
      setEditTask(task.task || '')
      setEditDueDate(task.dueDate || '')
  }, [task])

    
    const handleEditClick = () => {
      setIsEditing(true)
    }
    const handleCancelClick = () => {
      setIsEditing(false)
    }

    const handleSaveClick = (event) => {
      event.preventDefault()

      const updatedTaskData = {
        task: editTask || "",
        dueDate: editDueDate || "",
      }

      fetch(`http://localhost:8088/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTaskData)
      })
        .then(response => response.json())
        .then(updatedTask => {
          updateTask(updatedTask)
          fetchAllTasks()
          setIsEditing(false)
        })
    }

return (  
    
    <Form> 
        
        {isEditing ? ( <> 
           <Form.Group className="task-form-group">
               <Form.Label className="task-form-label">Task:</Form.Label>
               <Form.Control
                   type="text"
                   required
                   value={editTask}
                   onChange={(event) => setEditTask(event.target.value)}
                   placeholder="Enter new task"
               />
            </Form.Group>

               <Form.Group className="task-form-group">
               <Form.Label className="task-form-label">Due Date:</Form.Label>
               <Form.Control
               type="date"
               required
               value={editDueDate}
               onChange={(event) => setEditDueDate(event.target.value)}
               placeholder="Select due date"
           />
             </Form.Group>
           <Button 
           variant="success" 
           bsPrefix="save-task-button"
           onClick={handleSaveClick}>
           Save
           </Button>

           <Button 
           variant="success" 
           bsPrefix="cancel-task-button"
           onClick={handleCancelClick}>
           Cancel
           </Button>
           </>
           ) : (
            <>
      
        <Button 
         variant="success" 
         bsPrefix="edit-task-button"
         onClick={handleEditClick}>
         Edit
         </Button>
           
         </>
       
            )
           }
           </Form>
)}
