<fieldset>
                <div className="form-group">
                    <label htmlFor="complete">Complete:</label>
                    <input type="checkbox"
                        value={task.complete}
                        onChange={
                            (evt) =>{
                            const copy = {...task}
                              copy.complete = evt.target.checked  
                              update(copy) 
                            }
                        } />
                </div>
            </fieldset>


    
    return <>
    {
        <button onClick={() => navigate("/task/create")}>New Task</button>
    }
    <h2> Tasks List</h2>
    <article className="tasks">
    {
        tasks.map(
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



  





