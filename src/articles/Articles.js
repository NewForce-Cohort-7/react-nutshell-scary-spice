import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import AddArticle from "./AddArticle"
import EditArticle from "./EditArticle"
import './Articles.css'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [showAddArticleForm, setShowAddArticleForm] = useState(false)
  
  // edit article
  const [showEditArticleForm, setShowEditArticleForm] = useState(false) // state to show the edit article form
  const [articleToEdit, setArticleToEdit] = useState(null) // state to hold the article to edit

  // user object from local storage
  const localNutshellUser = localStorage.getItem("nutshell_user")
  const nutshellUserObject = JSON.parse(localNutshellUser)
  const userId = nutshellUserObject.id

 
  useEffect(() => { // hook to get all articles from the database
    fetchArticles()
  }, [])


  const fetchArticles = () => { // this is the GET request to get all articles from the database (fetchAllArticles)
    fetch(`http://localhost:8088/articles?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date)) // sorts articles by date
        const updatedArticles = sortedArticles.map(article => ({ // this is the map function to add tags to the articles
          ...article, 
          tags: article.tags ? article.tags.map(tag => tag.name) : [], // if articles.tag is true, map over the tags and return the tag name. if false, return an empty array
        }))
        // update state with new articles
        setArticles(updatedArticles)
      })
  }

  // filter articles by tag
  const handleTagClick = (tag) => {
    const filteredArticles = articles.filter((article) =>
    // some() method checks if at least one element in the article.tags array
    // matches the clicked tag, regardless of casing
    // t = tag, t.toLowerCase() = tag clicked, article.tags = array of tags on the article
        article.tags.some((t) => t.toLowerCase() === tag.toLowerCase()) 
    )
    setArticles(filteredArticles)
}

// add an article to the database 
  const handleSaveArticle = (article) => {
    const newArticle = {
      userId: nutshellUserObject.id,
      title: article.title,
      synopsis: article.synopsis,
      url: article.url,
      date: new Date().toISOString(),
      tags: article.tags.split(",").map((tag) => ({ name: tag.trim() })),
    }

    // Save the article and tags in a single request (saveArticle)
    fetch("http://localhost:8088/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    })
      .then(() => {
        // After saving the article and tags, fetch the updated articles
        fetchArticles()
      })
  }

  // this is the DELETE request to remove an article from the database (deleteArticle)
  const handleDeleteArticle = (id) => {
    fetch(`http://localhost:8088/articles/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchArticles()
    })
  }

  // this is the PUT request to update an article in the database 
  const handleUpdateArticle = (updatedArticle) => {
    const newArticle = {
      userId: nutshellUserObject.id,
      title: updatedArticle.title,
      synopsis: updatedArticle.synopsis,
      url: updatedArticle.url,
      date: updatedArticle.date,
      tags: updatedArticle.tags.split(",").map((tag) => ({ name: tag.trim() })),
    }

    // Update the article and tags in a single request (updateArticle)
    fetch(`http://localhost:8088/articles/${updatedArticle.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    })
      .then(() => {
        // After updating the article and tags, fetch the updated articles
        fetchArticles()
      })
  }

  // function to open the edit article form in a modal
  const openEditArticleForm = (article) => {
    setArticleToEdit(article) // sets the article to edit
    setShowEditArticleForm(true) // shows the edit article form modal
  }

  // function to close the edit article form ('x' button on modal)
  const closeEditArticleForm = () => {
    setShowEditArticleForm(false)
  }

  // hides the add article form until the 'add article' button is clicked
  const toggleAddArticleForm = () => {
    setShowAddArticleForm(!showAddArticleForm)
  }

  // show all articles upon clicking the 'show all articles' button
  const handleShowAllArticles = () => {
    fetchArticles()
  }

  // formats the date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }  

  return (
    <Container id="articles">
      <Row>
        <Col sm={{ span: 8, offset: 2 }} className="article-container">
          <h1 className="main-article-heading">Articles</h1>
          
          {articles.map((article) => (
           <div className="inner-article" key={article.id}>
           <div className="d-flex justify-content-between align-items-start">
             <div>
               <h3 className="article-title">{article.title}</h3> 
               <span className="article-date">{formatDate(article.date)}</span>
         
               {/* tags */}
               {article.tags
               .filter((tag) => tag !== undefined)
               .map((tag, index) => (
                 <React.Fragment key={`${article.id}-${tag}`}>
                   {/* using the index param of map to check if current tag is not first, then
                   adding a comma to separate the tags */}
                   {index > 0 && ","}
                   
                   <Button
                     variant="secondary"
                     bsPrefix="tag-button"
                     onClick={() => handleTagClick(tag)}
                   >
                     {tag}
                   </Button>
                 </React.Fragment>
               ))}
         
               <p className="article-synopsis">{article.synopsis}</p>
             </div>
         
             <div className="d-flex flex-column align-items-end openDelete">
               <Button 
                 bsPrefix="open-button"
                 href={article.url}
                 target="_blank"
               >
                 Open
               </Button>

               <Button
                  bsPrefix="edit-button"
                  variant="warning"
                  onClick={() => openEditArticleForm(article)}
                >
                  Edit
                </Button>

               <Button
                 bsPrefix="delete-button"
                 variant="danger"
                 onClick={() => handleDeleteArticle(article.id)}
               >
                 Delete
               </Button>

             </div>
           </div>
         </div>
          ))}

          <div className="add-article-show-all-buttons">
          <Button variant="primary" onClick={toggleAddArticleForm} bsPrefix="add-new-article-button">
            + Add new article
          </Button>
          <span className="divider">|</span>
          <Button
            variant="info"
            onClick={handleShowAllArticles}
            bsPrefix="add-new-article-button"
          >
            Show All Articles
          </Button>
          
          {showAddArticleForm && (
            <AddArticle handleSaveArticle={handleSaveArticle}
            toggleAddArticleForm={toggleAddArticleForm}
            />
          )}

          {showEditArticleForm && (
            <EditArticle
              show={showEditArticleForm}
              handleClose={closeEditArticleForm}
              handleUpdateArticle={handleUpdateArticle}
              article={articleToEdit}
            />
          )}
          </div>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Articles