import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const EditArticle = ({ article, handleUpdateArticle, handleClose }) => {
    const [title, setTitle] = useState(article.title);
    const [synopsis, setSynopsis] = useState(article.synopsis);
    const [url, setUrl] = useState(article.url);
    const [tags, setTags] = useState(article.tags.join(", "));
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleUpdateArticle({ ...article, title, synopsis, url, tags });
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        {/* Add form groups similar to AddArticle component with appropriate state variables */}
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Form>
    );
  };
  
  export default EditArticle