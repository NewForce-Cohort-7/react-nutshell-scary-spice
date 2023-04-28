import { useState, useEffect } from "react"
import { Button, Form, Card, Container, Row, Col, CloseButton } from "react-bootstrap"
import './Images.css'

const Images = () => {
  // user object from local storage
  const localNutshellUser = localStorage.getItem("nutshell_user")
  const nutshellUserObject = JSON.parse(localNutshellUser)
  const userId = nutshellUserObject.id

  // useState hooks
  const [images, setImages] = useState([])
  const [showAddImageForm, setShowAddImageForm] = useState(false)
  const [url, setUrl] = useState("")
  const [caption, setCaption] = useState("")
  const [tags, setTags] = useState("")
  const [filteredImages, setFilteredImages] = useState(null)  

  // fetch images from database
  useEffect(() => {
    fetch(`http://localhost:8088/images?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setImages(data))
  }, [])

  // add an image to the database
  const handleSaveImage = () => {
    const newImage = { userId, url, caption, tags: tags.split(",").map(tag => tag.trim()) }
    fetch("http://localhost:8088/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newImage),
    })
      .then((response) => response.json()) 
      .then((data) => {
        const updatedImages = [...images, data] // spread operator to add new image to the images array
        setImages(updatedImages) // update state with new image
        setShowAddImageForm(false) // hide the add image form
        setUrl("") // reset the url input field
        setCaption("") // reset the caption input field
      })
  }

  // delete an image from the database
  const handleDeleteImage = (id) => {
    fetch(`http://localhost:8088/images/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedImages = images.filter((image) => image.id !== id) // if the image id does not match the id of the image to delete, return the image
      setImages(updatedImages) // update state with the updated images array
    })
  }

  // hides the add image form until the 'add image' button is clicked
  const toggleAddImageForm = () => {
    setShowAddImageForm(!showAddImageForm)
  }

  // filter images by tag
  const filterImagesByTag = (tag) => {
    setFilteredImages(images.filter((image) => image.tags && image.tags.includes(tag))) // if the image has tags and the tag array includes the tag, return the image
  }

  const displayImages = filteredImages || images // if filteredImages is null, display all images

  return (
    
    <Container id="images">
     <Row>
        <Col className="images-container" lg={{ span: 8, offset: 2 }} >
            <h1 className="main-images-heading">Images</h1>
            <Row className="inner-image-container">
            {displayImages.map((image) => (
              <Col key={image.id} xs={6} sm={6} lg={4} className="mb-4">
                <Card style={{ width: "100%" }} className="no-round">
                  <Card.Img variant="top" src={image.url} />
                  <Card.Body className="mx-auto">
                    <Card.Title className="text-center">{image.caption}</Card.Title>
                    <div className="tags-container d-flex mx-auto justify-content-center">
                      {image.tags && image.tags.map((tag, index) => (
                        <span key={index}>
                        <Button
                          bsPrefix="images-tag-button"
                          onClick={() => filterImagesByTag(tag)}
                        > #{tag}
                        </Button>
                      </span>
                      ))}
                    </div>
                    <div className="d-flex mx-auto justify-content-center">
                    <Button
                      bsPrefix="delete-image-button"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      Delete
                    </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            </Row>
            <div className="d-flex mx-auto justify-content-center mb-4 pt-4 border-top">
                <Button 
                bsPrefix="add-image-button"
                onClick={toggleAddImageForm}>
                    Add Image
                </Button>
                <Button
                  bsPrefix="add-image-button"
                  className="ms-2" 
                  onClick={() => setFilteredImages(null)} 
                  >
                    Show All Images
                </Button>
            </div>
        {showAddImageForm && (
          <Form className="add-image-form">
            <div className="add-article-close-button"><CloseButton type="button" onClick={toggleAddImageForm}></CloseButton></div>
            <Form.Group 
                className="image-form-group">
              <Form.Label bsPrefix="image-form-label">Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="image-form-group">
              <Form.Label bsPrefix="image-form-label">Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags (comma separated)"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
              />
            </Form.Group>
            <Form.Group 
                className="image-form-group">
            <Form.Label bsPrefix="image-form-label">Image Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image caption"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
              />
            </Form.Group>
            <Button 
                bsPrefix="save-image-button"
                onClick={handleSaveImage}>
              Save Image
            </Button>
          </Form>
        )} 
        </Col>
        </Row>
      </Container>
  )
}
  
export default Images
  
  
  