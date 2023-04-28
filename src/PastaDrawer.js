/* <Form>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group> */

{filteredTasks.map(task => (
    <div key={task.id}>
      <EditTaskItem task={task} fetchAllTasks={fetchAllTasks} updateTask={updateTask} toggleAddTaskForm= {toggleAddTaskForm} />

return (
  


)


//older code TaskList w/out bootstrap</Container>

// return (
//     <>
//       <button onClick={toggleAddTaskForm}>New Task</button>
//       {isFormVisible && <TaskForm taskSubmitted={taskSubmitted} toggleAddTaskForm= {toggleAddTaskForm} />}
      
      
//       <div>
//         {filteredTasks.map(task => (
//           <div key={task.id}>
//             <EditTaskItem task={task} fetchAllTasks={fetchAllTasks} updateTask={updateTask} toggleAddTaskForm= {toggleAddTaskForm} /> {/* this is where we pass the updateTask function to EditTaskItem.js */}

//         <Form.Group className="task-form-group">
//         <Form.Check 
//         type="checkbox" 
//         label="Mark task as complete"
//         checked={task.complete}
//         onChange={() => handleTaskCompletion(task.id)}
//          />
//       </Form.Group>

//             <Button
//                 bsPrefix="task -delete-button"
//                 variant="success"
//                 onClick={() => handleDeleteTask(task.id)}> Delete
//             </Button>
//           </div>
//         ))}
//       </div>
//     </>
//   )




//older code: tasklist checkboc
{/* <input
type="checkbox"
checked={task.complete}
onChange={() => handleTaskCompletion(task.id)}
/> */}


//add task TaskForm--older code w/out bootstrap

// return (
//         <>
       
//         <form className="taskForm">
//             <h2 className="taskForm__title">New Task</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="task">Task:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="form-control"
//                         placeholder="Brief description of task"
//                         value={task.task}
//                         onChange={
//                             (evt) =>{
//                               const copy = {...task}
//                               copy.task = evt.target.value
//                               update(copy)
//                             }
//                             } />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="date">DueDate:</label>
//                     <input type="date"
//                         value={task.dueDate}
//                         onChange={
//                             (evt) =>{
//                               const copy = {...task}
//                               copy.dueDate = evt.target.value
//                               update(copy)
//                             }
//                         } />
//                 </div>
//             </fieldset>

//             <Button 
//                 variant="success" 
//                 bsPrefix="submit-task-button"
//                 onClick={(clickEvent) =>{handleSaveButtonClick(clickEvent)}}>
//                 Submit Task
//             </Button>

            
//         </form>
//         </>
//     )



  //Edit task form-older code w/out bootstrap

    // return (
    //   <div>
    //     {isEditing ? (
    //       <div>
    //         <input
    //           type="text"
    //           value={editTask}
    //           onChange={(event) => setEditTask(event.target.value)}
    //         />
    //         <input
    //           type="date"
    //           value={editDueDate}
    //           onChange={(event) => setEditDueDate(event.target.value)}
    //         />

    //             <Button 
    //             variant="success" 
    //             bsPrefix="save-task-button"
    //             onClick={handleSaveClick}>
    //             Save
    //             </Button>

    //             <Button 
    //             variant="success" 
    //             bsPrefix="cancel-task-button"
    //             onClick={handleCancelClick}>
    //             Cancel
    //             </Button>

    //       </div>
    //     ) : (
    //       <div>
    //         <section>{task.task}</section>
    //         <section>{task.dueDate}</section>

    //         <Button 
    //             variant="success" 
    //             bsPrefix="edit-task-button"
    //             onClick={handleEditClick}>
    //             Edit
    //             </Button>

            
    //       </div>
    //     )}
    //   </div>
    // )
  



// <button onClick={handleSaveClick}>Save</button>
// <button onClick={handleCancelClick}>Cancel</button>
// <button onClick={handleEditClick}>Edit</button>





















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




