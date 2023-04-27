import { Outlet, Route, Routes, Link } from "react-router-dom"
import { Login } from "../auth/Login"
import { ChatForm } from "../chat/ChatForm"
import { Chat } from "../chat/Chat"
import { ChatList } from "../chat/ChatList"
import Articles from "../articles/Articles"


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
              <Articles />
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
