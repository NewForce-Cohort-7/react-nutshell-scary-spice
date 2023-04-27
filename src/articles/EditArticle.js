import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap" // a modal is a pop-up window.

const EditArticle = ({ show, handleClose, handleUpdateArticle, article }) => {
  const [title, setTitle] = useState(article.title)
  const [synopsis, setSynopsis] = useState(article.synopsis)
  const [url, setUrl] = useState(article.url)
  const [tags, setTags] = useState(article.tags.join(", "))

  const handleSubmit = (event) => {
    event.preventDefault()
    handleUpdateArticle({ ...article, title, synopsis, url, tags }) // this is the same as the handleSaveArticle function in AddArticle.js
    handleClose() // close the modal
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title
            bsPrefix="article-modal-title">
                Edit Article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="article-form-group">
            <Form.Label className="article-form-label">Article Title:</Form.Label>
            <Form.Control
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
            />
          </Form.Group>
          <Form.Group className="article-form-group">
            <Form.Label className="article-form-label">Article URL:</Form.Label>
            <Form.Control
              type="text"
              required
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="URL"
            />
          </Form.Group>
          <Form.Group className="article-form-group">
            <Form.Label className="article-form-label">Article Synopsis:</Form.Label>
            <Form.Control
              as="textarea"
              required
              value={synopsis}
              onChange={(event) => setSynopsis(event.target.value)}
              placeholder="Enter synopsis here..."
              style={{ height: "100px" }}
            />
          </Form.Group>
          <Form.Group className="article-form-group">
            <Form.Label className="article-form-label">Tags:</Form.Label>
            <Form.Control
              type="text"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Enter comma-separated tags"
            />
          </Form.Group>
          <Button 
            bsPrefix="update-article-button" 
            type="submit">
            Update Article
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditArticle
