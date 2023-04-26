import { useEffect, useState } from "react"
import "./Chat.css"
import { Chat } from "./Chat"
import { useNavigate } from "react-router-dom"


export const ChatList = () => {
    const [chats, setChats] = useState([])

    const [filteredChats, setFiltered] = useState([])
    const navigate = useNavigate()

    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    
     const getAllChats = () => {
       
        fetch (`http://localhost:8088/Chat?_embed=chats`)
            .then(response => response.json())
            .then((chatArray) => {
                setChats(chatArray)
            })
        }
    

    useEffect(
        () => {
            if (nutshellUserObject) {
                   
                setFiltered(chats)
                    
                }

            else {
                
                const myChats = chats.filter(chat => chat.userId ===nutshellUserObject.id)
                setFiltered(myChats)
            }
        },
         [chats]
    )


    return <>
    {
        nutshellUserObject
        ?<>
            
            <button onClick={ () => setChats()} >Show All</button>
        </>
        : <>
            <button onClick={() => navigate("/chat/new")}>New Chat</button>
           
        </>
}
    <h2>List of Chats</h2>
    <article className="chats">
        {
        filteredChats.map(
            (chat) => <Chat key={`chat--${chat.id}`}
            getAllChats={getAllChats} //prop sharing the fetch call to rerender after the button is clicked in Ticket.js
            currentUser={nutshellUserObject} 
            chatObject={chat} />

             )
          }
        </article>
    </>
} 