import { useState, useRef } from "react"
import { Button, Form, CloseButton } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

const AddArticle = ({ handleSaveArticle, toggleAddArticleForm }) => {
    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [url, setUrl] = useState("")
    const [tags, setTags] = useState("")
    const formRef = useRef() // useRef is a hook that allows us to reference a DOM element


    const handleSubmit = (event) => {
        event.preventDefault()
        handleSaveArticle({ title, synopsis, url, tags }) 

        // clear the form
        if (formRef.current) { 
            formRef.current.reset() // this resets the form
        }    
    }

    return (
        <Form ref={formRef} onSubmit={handleSubmit} className="add-article-form">
            <div className="add-article-close-button"><CloseButton type="button" onClick={toggleAddArticleForm}></CloseButton></div>
            <Form.Group className="article-form-group">
                <Form.Label className="article-form-label">Article Title:</Form.Label>
                <Form.Control
                    type="text"
                    required
                    onChange={event => setTitle(event.target.value)}
                    placeholder="Title"
                />
            </Form.Group>
            <Form.Group className="article-form-group">
                <Form.Label className="article-form-label">Article URL:</Form.Label>
                <Form.Control
                    type="text"
                    required
                    onChange={event => setUrl(event.target.value)}
                    placeholder="URL"
                />
            </Form.Group>
            <Form.Group className="article-form-group">
                <Form.Label className="article-form-label">Article Synopsis:</Form.Label>
                <Form.Control
                    as="textarea"
                    required
                    onChange={event => setSynopsis(event.target.value)}
                    placeholder="Enter synopsis here..."
                    style={{ height: '100px' }}
                />
            </Form.Group>
            <Form.Group className="article-form-group">
                <Form.Label className="article-form-label">Tags:</Form.Label>
                <Form.Control
                    type="text"
                    onChange={(event) => setTags(event.target.value)}
                    placeholder="Enter comma-separated tags"
                    />
                </Form.Group>
            <Button 
                variant="primary" 
                type="submit"
                bsPrefix="submit-article-button">
                Submit Article
            </Button>
        </Form>
    )
}

export default AddArticle