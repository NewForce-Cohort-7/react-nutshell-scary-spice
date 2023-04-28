import { Outlet, Route, Routes, Link } from "react-router-dom"
import { Login } from "../auth/Login"
import Articles from "../articles/Articles"
import { EventContainer } from "../Events/EventContainer"
import Images from "../images/Images"
import { EventEdit } from "../Events/EventEdit"


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

             <EventContainer/>
             
              <Articles />
              <Images />
              <Outlet />
            </>
          }
        />
         <Route exact path="events/:eventId/edit" element={ < EventEdit/> } /> 
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
