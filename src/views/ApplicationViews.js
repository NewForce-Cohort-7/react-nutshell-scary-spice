import { Outlet, Route, Routes, Link } from "react-router-dom"
import { Login } from "../auth/Login"
import { ChatList } from "../chat/ChatList"
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
             
              <ChatList />
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
