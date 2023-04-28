import React, { useState, useEffect } from 'react'
import { TaskForm } from './TaskForm'
import { EditTaskItem } from './EditTaskItem'
import {Container, Row, Col,Button, Form, Stack} from 'react-bootstrap';
import './Tasks.css'

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

    // this is the DELETE request to remove a task from the database
  const handleDeleteTask = (id) => {
    fetch(`http://localhost:8088/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchAllTasks()
    })
  }

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
      
      {isFormVisible && <TaskForm taskSubmitted={taskSubmitted} toggleAddTaskForm= {toggleAddTaskForm} />}

      

  <Container id="task"fluid="md">
      <Row>
        <Col className="task-list-field">
        <h1 className="task-heading">Tasks</h1>
        
            <Button
                bsPrefix="newtask-button"
                variant="success"
                onClick={toggleAddTaskForm}> New Task
            </Button>

        {filteredTasks.map(task => (
        
                <>
                <EditTaskItem task={task} fetchAllTasks={fetchAllTasks} updateTask={updateTask} toggleAddTaskForm= {toggleAddTaskForm} /> {/* this is where we pass the updateTask function to EditTaskItem.js */}
                
                <div className="task-item" key={task.id}>
                <Stack direction="horizontal" gap={2}>
                <p className="task-field">{task.task}</p>
                <span className="task-dueDate">{task.dueDate}</span>
                
                <Button
                bsPrefix="task-delete-button"
                variant="success"
                onClick={() => handleDeleteTask(task.id)}> Delete
                </Button>
                </Stack>

                <Form.Group className="task-form-group">
                <Form.Check 
                    type="checkbox" 
                    label="Mark task as complete"
                    checked={task.complete}
                   onChange={() => handleTaskCompletion(task.id)}
                />
                </Form.Group>

            
            </div>
                </>
        ))}

        </Col>
      </Row>
    </Container>
      
    </>
  )

        }

//   return (
//     <>
      
//       {isFormVisible && <TaskForm taskSubmitted={taskSubmitted} toggleAddTaskForm= {toggleAddTaskForm} />}

      

//   <Container id="task"fluid="md">
//       <Row>
//         <Col className="task-list-field">
//         <h1 className="task-heading">Tasks</h1>
        
//             <Button
//                 bsPrefix="newtask-button"
//                 variant="success"
//                 onClick={toggleAddTaskForm}> New Task
//             </Button>

//         {filteredTasks.map(task => (
        
//                 <>
//                 <EditTaskItem task={task} fetchAllTasks={fetchAllTasks} updateTask={updateTask} toggleAddTaskForm= {toggleAddTaskForm} /> {/* this is where we pass the updateTask function to EditTaskItem.js */}

//                 <div className="task-item" key={task.id}>
//                 <p className="task-field">{task.task}</p>
//                 <h3 className="task-dueDate">{task.dueDate}</h3>

//                 <Form.Group className="task-form-group">
//                 <Form.Check 
//                     type="checkbox" 
//                     label="Mark task as complete"
//                     checked={task.complete}
//                    onChange={() => handleTaskCompletion(task.id)}
//                 />
//                 </Form.Group>

//             <Button
//                 bsPrefix="task-delete-button"
//                 variant="success"
//                 onClick={() => handleDeleteTask(task.id)}> Delete
//             </Button>
//             </div>
//                 </>
//         ))}

//         </Col>
//       </Row>
//     </Container>
      
//     </>
//   )
// }









