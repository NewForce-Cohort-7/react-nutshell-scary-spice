import { useEffect, useState, } from "react"
import { useNavigate } from "react-router-dom"



export const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])


    const navigate= useNavigate ()
   
    const handleCheckedBox = (event) => {
        useEffect(
            ()=>{
        if (complete) {
          const updatedList = tasks.filter(task=>task.complete===true)
          setFilteredTasks(updatedList);
        } else {
            setFilteredTasks(tasks);
        }
        
      }, [complete])
   
    }
   
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
    
    return <>
    {
        <button onClick={() => navigate("/task/create")}>New Task</button>
    }
    <h2> Tasks List</h2>
    <article className="tasks">
    {
        filteredTasks.map(
            (task)=>{
                if(task.complete === false){
                return <section className="task" key={`task--${task.id}`}>
                    <input value={task} type="checkbox" onChange={handleCheckedBox}  />
                    <header>{task.task}</header>
                    <header>{task.dueDate}</header>
                    
                </section>
            }
          }
        )
    }
    </article>
    </>

}