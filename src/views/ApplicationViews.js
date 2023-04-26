import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { TaskList } from "../tasks/TaskList"
import { TaskForm } from "../tasks/TaskForm"


export const ApplicationViews = () => {
  // Retrieving the user object from local storage
  const localNutshellUser = localStorage.getItem("nutshell_user")
  const nutshellUserObject = JSON.parse(localNutshellUser)

  if (nutshellUserObject) {
    return (
      <Routes>
        <Route path="/" element={
            <>
              <Outlet />
              <TaskList/>
            </>
             
          }>
          
          {/* <Route path="tasks" element = {<TaskList/>}/>
          <Route path="task/create" element={ <TaskForm /> } /> */}
       </Route >  

      </Routes>
    )
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}
