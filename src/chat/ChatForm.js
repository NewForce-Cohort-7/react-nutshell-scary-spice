import { useState } from "react";
import { useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, CloseButton } from "react-bootstrap";

 const ChatForm = ({ handleSendChat, toggleChatForm }) => {
    const [message, setMessage]  = useState("")
    const [userName, setUserName] = useState("")
    const formRef = useRef()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        handleSendChat({ userName, message })

        if (formRef.current) {
            formRef.current.reset()
        }
    }

    return (
        <Form ref={formRef} onSubmit={handleSubmit} className="chat-form">
            <div className="chat-form-close-button"><CloseButton type="button" onClick={toggleChatForm}></CloseButton></div>
            <Form.Group className="chat-form-group">
                <Form.Label className="chat-Form-label">UserName:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        onChange={event => setUserName(event.target.value)}
                        placeholder="Enter your UserName..."
                    />
                </Form.Group>
                <Form.Group className="chat-form-group">
                    <Form.Label className="chat-form-label">New Message:</Form.Label>
                    <Form.Control
                        type="textarea"
                        required
                        onChange={event => setMessage(event.target.value)}
                        placeholder="What would you like to say?"
                        style={{ height: '80px' }}
                    />
            
                </Form.Group>   
            <Button 
                variant="primary" 
                type="submit"
                bsPrefix="send-chat-button">
                Send Message
            </Button>
        </Form>
      )
 }

 export default ChatForm
