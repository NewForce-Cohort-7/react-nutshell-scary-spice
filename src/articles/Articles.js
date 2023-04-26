import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import AddArticle from "./AddArticle"
import './Articles.css'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [showAddArticleForm, setShowAddArticleForm] = useState(false)
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
          tags: article.tags ? article.tags.map(tag => tag.name) : [], // grabbing the tag names from the tags array 
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

// add an article to the database (saveArticle)
  const handleSaveArticle = (article) => {
    const newArticle = {
      userId: nutshellUserObject.id,
      title: article.title,
      synopsis: article.synopsis,
      url: article.url,
      date: new Date().toISOString(),
      tags: article.tags.split(",").map((tag) => ({ name: tag.trim() })),
    }

    // Save the article and tags in a single request
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

  // hides the add article form until the 'add article' button is clicked
  const toggleAddArticleForm = () => {
    setShowAddArticleForm(!showAddArticleForm)
  }

  // show all articles 
  const handleShowAllArticles = () => {
    fetchArticles()
  }

  // formats the date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }  

  return (
    <Container>
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
          <Button variant="primary" onClick={toggleAddArticleForm} className="mt-3" bsPrefix="add-new-article-button">
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
            <AddArticle handleSaveArticle={handleSaveArticle} />
          )}
          </div>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Articles