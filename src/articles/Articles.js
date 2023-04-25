import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import AddArticle from "./AddArticle"

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [showAddArticleForm, setShowAddArticleForm] = useState(false)
  const localNutshellUser = localStorage.getItem("nutshell_user")
  const nutshellUserObject = JSON.parse(localNutshellUser)
  const userId = nutshellUserObject.id


  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = () => {
    fetch(`http://localhost:8088/articles?userId=${userId}`) // ensures that only the current user will see THEIR articles
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setArticles(sortedData)
      })
  }

  const handleSaveArticle = (article) => {
    const newArticle = {
      userId: nutshellUserObject.id, // assigns the current user as the author of the article
      title: article.title,
      synopsis: article.synopsis,
      url: article.url,
      date: new Date().toISOString() // formats the date to be more readable
    }

    fetch("http://localhost:8088/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    })

    fetchArticles()
  }

  const handleDeleteArticle = (id) => {
    fetch(`http://localhost:8088/articles/${id}`, {
      method: "DELETE",
    })

    fetchArticles()
  }

  // hides the add article form until the 'add article' button is clicked
  const toggleAddArticleForm = () => {
    setShowAddArticleForm(!showAddArticleForm)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }  

  return (
    <Container>
      <Row>
        <Col>
          <h1>Articles</h1>
          <hr />
          {articles.map((article) => (
            <div key={article.id}>
              <h3>{article.title}</h3>
              <p>{formatDate(article.date)}</p>
              <div className="d-flex justify-content-between">
                <p>{article.synopsis}</p>
                <div>
                  <a
                    href={article.url}
                    target="_blank"
                  >
                   Open
                  </a>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="primary" onClick={toggleAddArticleForm} className="mt-3">
            Add Article
          </Button>
          {showAddArticleForm && (
            <AddArticle handleSaveArticle={handleSaveArticle} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Articles
