import { Outlet, Route, Routes, Link } from "react-router-dom"
import { Login } from "../auth/Login"
import { TaskList } from "../tasks/TaskList"
import Articles from "../articles/Articles"


export const ApplicationViews = () => {
  // Retrieving the user object from local storage
  const localNutshellUser = localStorage.getItem("nutshell_user")
  const nutshellUserObject = JSON.parse(localNutshellUser)

  if (nutshellUserObject) {
    return (
      <Routes>
        <Route path="/" element={
            <>
              <TaskList/>
              <Articles />
              <Outlet />
            </>
             
          }>
          {/* <Route path="task/create" element={ <TaskForm /> } /> */}

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
