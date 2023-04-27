import React, { useState, useEffect } from 'react'

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
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editTask}
              onChange={(event) => setEditTask(event.target.value)}
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(event) => setEditDueDate(event.target.value)}
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <div>
            <section>{task.task}</section>
            <section>{task.dueDate}</section>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    )
  }

























// import React, { useState, useEffect } from 'react';


// export const EditTaskItem=({ task })=>{
//     const [isEditing, setIsEditing] = useState(false);
//     const [editTask, setEditTask] = useState(task.task);
//     const [editDueDate, setEditDueDate] = useState(task.dueDate);
  
//     const handleEditClick = () => {
//       setIsEditing(true);
//     };
  
//     const handleCancelClick = () => {
//       setIsEditing(false);
//     };
  
   
//     const handleSaveClick = (event ) => {
//       // save the edited task and due date to your database 

//       //need a fetch function to send a PUT request api/tasks/taskId= specify Id of the task to be updated...get id from task prop along with {id, task, dueDate, complete}
//       event.preventDefault()

//       const updatedTaskData={
//         task:editTask,
//         dueDate:editDueDate
//     }

//     fetch(`http://localhost:8088/tasks/${task.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedTaskData)
//     });
    
//     //   fetchAllTasks()
//       setIsEditing(false);
//     }
   
  
//     return (
//       <div>
//         {isEditing ? (
//           <div>
//             <input
//               type="text"
//               value={editTask}
//               onChange={(event) => setEditTask(event.target.value)}
//             />
//             <input
//               type="date"
//               value={editDueDate}
//               onChange={(event) => setEditDueDate(event.target.value)}
//             />
//             <button onClick={handleSaveClick}>Save</button>
//             <button onClick={handleCancelClick}>Cancel</button>
//           </div>
//         ) : (
//           <div>
//             <section>{task.task}</section>
//             <section>{task.dueDate}</section>
//             <button onClick={handleEditClick}>Edit</button>
//           </div>
//         )}
//       </div>
//     );
//   }
