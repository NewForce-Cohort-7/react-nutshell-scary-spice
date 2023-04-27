import React, { useEffect, useState } from "react"
import "./Chat.css"
import { Container, Row, Col, Button } from "react-bootstrap"
import { ChatForm } from "./ChatForm"


export const ChatList = () => {
    const [chat, setChats] = useState([])
    const [showChatForm, setShowChatForm] = useState(false)

    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)
    const userId = nutshellUserObject.id

useEffect(() => {
    fetchChats()
}, [])

const fetchChats = () => {
    fetch(`http://localhost:8088/chat?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
        const sortedChats = data.sort((a, b) => new Date(b.date) - new Date(a.date)) // sorts articles by date
        const updatedChats = sortedChats.map(chat => ({ // this is the map function to add tags to the chats
          ...chat, 
          tags: chat.tags ? chat.tags.map(tag => tag.name) : [], // if chats.tag is true, map over the tags and return the tag name. if false, return an empty array
        }))
        // update state with new chats
        setChats(updatedChats)
      })
  }
// add an chatto the database 
  const handleSendChat = (chat) => {
    const newMessage = {
      userId: nutshellUserObject.id,
      userName: chat.userName,
      message: chat.message,
      date: new Date().toISOString()
      
    }

    // Save the chat(sendChat)
    fetch("http://localhost:8088/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then(() => {
        // After saving the chat, fetch the updated chat
        fetchChats()
      })
  }

  // this is the DELETE request to remove an chatfrom the database (deleteArticle)
  const handleDeleteChat = (id) => {
    fetch(`http://localhost:8088/chat/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchChats()
    })
  }

  // this is the PUT request to update an chatin the database 
  const handleUpdateChat = (updatedChat) => {
    const newMessage = {
      userId: nutshellUserObject.id,
      userName: updatedChat.userName,
      message: updatedChat.message,
      date: updatedChat.date,
    }

    

    fetch(`http://localhost:8088/chat/${updatedChat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then(() => {
        // After updating the chat, fetch the updated chat
        fetchChats()
      })
  }

  // hides the add chatform until the 'new message' button is clicked
  const toggleChatForm = () => {
    setShowChatForm(!showChatForm)
  }

  // show all chats upon clicking the 'show all chats' button
  const handleShowAllChats = () => {
    fetchChats()
  }

  // formats the date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }  
     return (
        <Container id="chats">
          <Row>
            <Col sm={{ span: 7, offset: 3 }} className="chat-container">
               <h1 className="chat-heading">Chats</h1>
            
                {chat.map((chat) => (
                <div className="inner-chat" key={chat.id}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="chat-user-name">{chat.userName}</h3> 
                     <span className="chat-date">{formatDate(chat.date)}</span>
                
                        
                        <p className="chat-message">{chat.message}</p>
                        </div>
                         
                        <Button
                            bsPrefix="delete-button"
                            variant="danger"
                            onClick={() => handleDeleteChat(chat.id)}
                        >
                            Delete
                        </Button>

                        </div>
                       </div>
               ))}

                    <div className="chat-form-show-all-buttons">
                    <Button variant="primary" onClick={toggleChatForm} bsPrefix="add-new-chat-button">
                        + Send New Message
                     </Button>
                        <Button
                        variant="info"
                        onClick={handleShowAllChats}
                        bsPrefix="add-new-message-button"
                    >
                        Chat History
                    </Button>
                    
                      {showChatForm && (
                        <ChatForm handleSendChat={handleSendChat}
                        toggleChatForm={toggleChatForm}
                        />
                  )}
               
            </div>
            
            </Col>
        </Row>
        </Container>
    )}
export default ChatList