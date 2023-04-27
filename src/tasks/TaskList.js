import React, { useState, useEffect } from 'react'
import { TaskForm } from './TaskForm'
import { EditTaskItem } from './EditTaskItem'

export const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [isFormVisible, setIsFormVisible] = useState(false)
  

  // we are passing this to task form so when it's submitting, it updates with current state
  const taskSubmitted = () => {
    fetchAllTasks()
  }

  const toggleAddTaskForm = () => {
    setIsFormVisible(!isFormVisible)
  }

  const fetchAllTasks = () => {
    fetch(`http://localhost:8088/tasks`)
      .then(response => response.json())
      .then(taskArray => {
        setTasks(taskArray)
      })
  }

  useEffect(() => {
    fetchAllTasks()
  }, [])

  useEffect(() => {
    const newTasklist = tasks.filter(task => !task.complete)
    setFilteredTasks(newTasklist)
  }, [tasks])

  

  const handleTaskCompletion = taskId => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, complete: true }
      }
      return task
    })

    setTasks(updatedTasks)
    


        const updatedTask = updatedTasks.find(task => task.id === taskId)
        fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
        }).then(() => {
        // After updating fetch the updated tasks
        fetchAllTasks()
        })
    };

   

// this is the function that is passed to EditTaskItem.js
// it is called when the save button is clicked and the task is updated
// this will show the task as it now is in state
  const updateTask = updatedTask => {
    setTasks(prevTasks => 
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)) // if the task id matches the updated task id, return the updated task, otherwise return the task
    )
  }

  return (
    <>
      <button onClick={toggleAddTaskForm}>New Task</button>
      {isFormVisible && <TaskForm taskSubmitted={taskSubmitted} />}
      
      
      <div>
        {filteredTasks.map(task => (
          <div key={task.id}>
            <EditTaskItem task={task} fetchAllTasks={fetchAllTasks} updateTask={updateTask} toggleAddTaskForm= {toggleAddTaskForm} /> {/* this is where we pass the updateTask function to EditTaskItem.js */}
            <input
              type="checkbox"
              checked={task.complete}
              onChange={() => handleTaskCompletion(task.id)}
            />
          </div>
        ))}
      </div>
    </>
  )
}










// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router'; 
// import { TaskForm } from './TaskForm';
// import { EditTaskItem } from './EditTaskItem';

// export const TaskList = () => {
// const navigate = useNavigate  
// const [tasks, setTasks] = useState([]);
// const [filteredTasks, setFilteredTasks] = useState([]);

// const [isFormVisible, setIsFormVisible] = useState(false)

// const toggleAddTaskForm = () => {
//     setIsFormVisible(!isFormVisible)
//   }


// const fetchAllTasks = () => { // this is the GET request to get all tasks from the database 
//          fetch(` http://localhost:8088/tasks`)
//             .then(response => response.json())
//             .then((taskArray)=>{
//                 setTasks(taskArray)
         
//             })
//         }

// useEffect(() => { // hook to get all articles from the database
//              fetchAllTasks()
//           }, []
//           )


// //   useEffect(
// //     ()=>{
        
// //         fetch(` http://localhost:8088/tasks
// //         `)
// //         .then(response => response.json())
// //         .then((taskArray)=>{
// //             setTasks(taskArray)
     
// //         })

// //     },
// //    []
  
// // )
  

// useEffect(
//     () => {
//     const newTasklist=(tasks.filter((task) => !task.complete));
//     setFilteredTasks(newTasklist)
//   }, 
//   [tasks]
  
//   )

//   const handleTaskCompletion = (taskId) => {
//     const updatedTasks = tasks.map(task => {
//       if (task.id === taskId) {
//         task.complete = true 
//       }
//         return task
      
//     });

//     setTasks(updatedTasks);
    
//     const updatedTask = updatedTasks.find(task => task.id === taskId)
//     fetch(`http://localhost:8088/tasks/${taskId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedTask)
//     })
//         .then(() => {
//         // After updating fetch the updated tasks
//         fetchAllTasks()
//       })
//   }

//   return <>
  

//   <button onClick={toggleAddTaskForm}>New Task</button>
//     {isFormVisible && <TaskForm />}
 
//     <div>
//       {filteredTasks.map(task => (
//         <div key={task.id} > <EditTaskItem task= {task} />
//           <input
//             type="checkbox"
//             checked={task.complete}
//             onChange={() => handleTaskCompletion(task.id)}
//           />
//           <section>{task.task}</section>
//           <section>{task.dueDate}</section>
          
//         </div>
//       ))}
//     </div>

// </>

// }
