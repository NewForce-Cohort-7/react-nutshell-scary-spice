import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatForm = ({ handleSaveChat }) => {
    const [message, setMessage]  = useState("")
    const [userName, setUserName] = useState("")
    const formRef = useRef
    
    

    //redirect user to Chat List
    const navigate = useNavigate()
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (formRef.current) {
            formRef.current.reset()
        }
    


        //Create object to be saved to the API

        const chatToSendToAPI = {
            userId: nutshellUserObject.id,
            userName: chat.userName,
            message: chat.message
        }

        //Fetch to POST object to API
        return fetch(`http://localhost:8088/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chatToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/chat")
            })
        }

    return (
        <Form ref={formRef} onSubmit={handleSubmit} className="chatForm">
            <Form.Group className="chatForm__title">New Message</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userName">UserName:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter UserName"
                        value={chat.userName}
                        onChange={
                            (evt) => {
                                const copy = {...chat}
                                copy.userName = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What do you want to say?"
                        value={chat.message}
                        onChange={
                            (evt) => {
                                const copy = {...chat}
                                copy.message = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Send Message
            </button>
        </form>
    )
 }
