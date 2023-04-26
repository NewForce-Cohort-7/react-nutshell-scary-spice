import React, { useState, useEffect } from 'react';

export const TaskList = () => {
  
const [tasks, setTasks] = useState([]);
const [filteredTasks, setFilteredTasks] = useState([]);

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
    });
  };


  return (
    <div>
      {filteredTasks.map(task => (
        <div key={task.id}>
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
  );
}


