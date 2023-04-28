import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const EditChat = ( { handleUpdatedChat }) => {
    const [chat, assignChat] = useState({
        userName: "",
        message: ""
    })
    const { chatId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/chat/${chatId}`)
            .then(response => response.json())
            .then((data) => {
                assignChat(data)
            })
    }, [chatId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/chat/${chat.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chat)
        })
            .then(response => response.json())
            .then(() => {
                handleUpdatedChat(chat)
                resetForm()
            })
    }

    const resetForm = () => {
        assignChat({
            userName: "",
            message: ""
        })
    }


    return <form className="chatForm">
        <h2 className="chatForm__title">Edit Message</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={chat.message}
                    onChange={
                        (evt) => {
                            const copy = { ...chat }
                            copy.message = evt.target.value
                            assignChat(copy)
                        }
                    }>{chat.message}</textarea> 
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}

