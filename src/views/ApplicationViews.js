import { Outlet, Route, Routes, Link } from "react-router-dom"
import { Login } from "../auth/Login"
import Articles from "../articles/Articles"
import { EventContainer } from "../Events/EventContainer"
import Images from "../images/Images"


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
