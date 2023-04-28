import React, { useEffect, useState } from "react"
import "./Chat.css"
import { Container, Row, Col, Button } from "react-bootstrap"
import { ChatForm } from "./ChatForm"
import { EditChat } from "./EditChat"


export const ChatList = () => {
    const [chat, setChats] = useState([])
    const [showChatFormForm, setShowChatFormForm] = useState(false)
    const [ editChatForm, setEditChatForm ] = useState(false)
    const [ chatEdit, setChatEdit ] = useState(null)

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
        const sortedChats = data.sort((a, b) => new Date(b.date) - new Date(a.date)) // sorts chats by date
        const updatedChats = sortedChats.map(chat => ({ 
          ...chat, 
          tags: chat.tags ? chat.tags.map(tag => tag.name) : [], 
        }))
        // update state with new chats
        setChats(updatedChats)
      })
  }
// add an chat to the database 
  const handleSendChat = (chat) => {
    const newMessage = {
      userId: nutshellUserObject.id,
      userName: chat.userName,
      message: chat.message,
      date: new Date().toISOString()
      
    }

    // Save the chat(sendChat)
    fetch(`http://localhost:8088/chat?userId=${userId}`, {
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

  // this is the DELETE request to remove an chat rom the database (deleteChat)
  const handleDeleteChat = (id) => {
    fetch(`http://localhost:8088/chat/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchChats()
    })
  }

  // this is the PUT request to update an chat in the database 
     const handleUpdateChat = (updatedChat) => {
          const chatId = updatedChat.id
            const newMessage = {
            userId: nutshellUserObject.id,
            userName: updatedChat.userName,
            message: updatedChat.message,
            date: updatedChat.date,
            }

    

    fetch(`http://localhost:8088/chat/${chatId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then(() => {
        // After updating the chat, fetch
        fetchChats()
      })
  }

  // hides the add chat form until the 'new message' button is clicked
  const toggleChatFormForm = () => {
    setShowChatFormForm(!showChatFormForm)
  }

 
  const openChatEdit = (chat) => {
    setChatEdit(chat)
    setEditChatForm(true)
  }
  const closeEditChat   = () => {
    setChatEdit(null) 
    setEditChatForm(false) 
  }

  // formats the date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }  
     return (
        <Container id="chat">
          <Row>
            <Col sm={{ span: 8, offset: 2 }} className="chat-container">
               <h1 className="chat-heading">Chats</h1>
            
                {chat.map((chat) => (
                <div className="inner-chat" key={chat.id}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="chat-user-name">{chat.userName}</h3> 
                     <span className="chat-date">{formatDate(chat.date)}</span>
                
                        
                        <p className="chat-message">{chat.message}</p>
                        </div>
                        <div className="edit-delete-chat-buttons">
                        <Button
                            bsPrefix="edit-chat-button"
                            variant="warning"
                            onClick={() => openChatEdit(chat)}
                         >
                            Edit
                         </Button>
                        
                        <Button
                            bsPrefix="chat-delete-button"
                            variant="danger"
                            onClick={() => handleDeleteChat(chat.id)}
                        >
                            Delete
                        </Button>
                        </div>
                        </div>
                       </div>
               ))}

                    <div className="chat-form-show-all-buttons">
                    <Button variant="primary" onClick={toggleChatFormForm} bsPrefix="add-new-chat-button">
                        + Send New Message
                     </Button>
                       
                        {showChatFormForm && (
                        <ChatForm handleSendChat={handleSendChat}
                        toggleChatFormForm={toggleChatFormForm}
                />
                )} 
                          {editChatForm && (
                            <EditChat
                            // show={editChatForm}
                            handleCloseEditChat={closeEditChat}
                            handleUpdatedChat={handleUpdateChat}
                            chat={chatEdit}
                            chatId={chatEdit.id}
                            />
                        )}    
                
               
            </div>
            
            </Col>
        </Row>
        </Container>
    )}
