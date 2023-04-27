import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'; 
import { TaskForm } from './TaskForm';
import { EditTaskItem } from './EditTaskItem';

export const TaskList = () => {
const navigate = useNavigate  
const [tasks, setTasks] = useState([]);
const [filteredTasks, setFilteredTasks] = useState([]);

const [isFormVisible, setIsFormVisible] = useState(false)

const toggleAddTaskForm = () => {
    setIsFormVisible(!isFormVisible)
  }

  const fetchALLTasks = () => { // this is the GET request to get all tasks from the database 
  useEffect(
    ()=>{
        
        fetch(` http://localhost:8088/tasks
        `)
        .then(response => response.json())
        .then((taskArray)=>{
            setTasks(taskArray)
     
        })

    },
   []
  
)
  }

useEffect(
    () => {
    const newTasklist=(tasks.filter((task) => !task.complete));
    setFilteredTasks(newTasklist)
  }, 
  [tasks]
  
  )

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.complete = true 
      }
        return task
      
    });

    setTasks(updatedTasks);
    
    const updatedTask = updatedTasks.find(task => task.id === taskId)
    fetch(`http://localhost:8088/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
        .then(() => {
        // After updating fetch the updated tasks
        fetchALLTasks()
      })
  }

  return <>
  

  <button onClick={toggleAddTaskForm}>New Task</button>
    {isFormVisible && <TaskForm />}
 
    <div>
      {filteredTasks.map(task => (
        <div key={task.id} > <EditTaskItem task= {task} fetchAllTasks={fetchALLTasks}/>
          <input
            type="checkbox"
            checked={task.complete}
            onChange={() => handleTaskCompletion(task.id)}
          />
          <section>{task.task}</section>
          <section>{task.dueDate}</section>
          
        </div>
      ))}
    </div>

</>

}
