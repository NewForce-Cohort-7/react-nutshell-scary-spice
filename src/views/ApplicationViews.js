import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { ChatForm } from "../chat/ChatForm"
import { Chat } from "../chat/Chat"
import { ChatList } from "../chat/ChatList"


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
             <Chat />
             <ChatList />
             <ChatForm />
              <Outlet />
            </>
          }>
           
            </Route>
        
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
