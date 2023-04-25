import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

const AddArticle = ({ handleSaveArticle }) => {
    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        handleSaveArticle({ title, synopsis, url })
        
        // Reset the form fields by clearing the state variables
        setTitle("")
        setSynopsis("")
        setUrl("")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Article Title:</Form.Label>
                <Form.Control
                    type="text"
                    required
                    onChange={event => setTitle(event.target.value)}
                    placeholder="Title"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Article URL:</Form.Label>
                <Form.Control
                    type="text"
                    required
                    onChange={event => setUrl(event.target.value)}
                    placeholder="URL"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Article Synopsis:</Form.Label>
                <Form.Control
                    as="textarea"
                    required
                    onChange={event => setSynopsis(event.target.value)}
                    placeholder="Enter synopsis here..."
                    style={{ height: '100px' }}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default AddArticle