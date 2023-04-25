import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import NavBar from "../nav/NavBar"

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
              <NavBar />
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
