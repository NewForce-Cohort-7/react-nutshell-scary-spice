import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { EventList } from "../Events/EventList"
import { EventForm } from "../Events/EventForm"


export const ApplicationViews = () => {
  // Retrieving the user object from local storage
  const localNutshellUser = localStorage.getItem("nutshell_user")
  const nutshellUserObject = JSON.parse(localNutshellUser)

  if (nutshellUserObject) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <>
              
              <Outlet />
             <EventList/>
             <EventForm/>
       
            </>
          }
        />
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
