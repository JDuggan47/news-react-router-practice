import React, { Component } from 'react';
import ArticleTile from '../components/ArticleTile'
import NewArticleForm from '../components/NewArticleForm'

class ArticlesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      description:'',
      url:'',
      articles: []
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.getData = this.getData.bind(this)
  }

    handleTitleChange(event) {
      this.setState({title: event.target.value})
    }

    handleDescriptionChange(event) {
      this.setState({description: event.target.value})
    }

    handleUrlChange(event) {
      this.setState({url: event.target.value})
    }

    handleClearForm(){
      this.setState({
        title:'',
        description:'',
        url:''
      })
    }

    handleFormSubmit(event){
      event.preventDefault()
      let formPayload = {
        title: this.state.title,
        description: this.state.description,
        url: this.state.url
      }
      fetch(`/api/v1/articles`, {
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload)
      })
      .then(response => {
        if (response.ok) {
          let article = response.json()
          return article;
        } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error); }
      })
      .then(article => {
        let currentState = this.state.articles
        debugger;
        let newArticle = article
        let newState = currentState.concat(newArticle)
        this.setState({articles: newState});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
      this.handleClearForm(event);
    }

    getData() {
      fetch(`/api/v1/articles`, {credentials: 'same-origin'})
      .then(response => {
         if (response.ok) {
           return response;
         } else {
           let errorMessage = `${response.status} ($response.statusText)`,
             error = new Error(errorMessage);
           throw(error);
         }
       })
       .then(response => response.json())
       .then(body => {
         this.setState({articles: body});
       })
       .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    componentDidMount() {
      this.getData();
    }

  render() {
    let newArticle = this.state.articles.map(article => {
      return (
        <ArticleTile
          id={article.id}
          key={article.id}
          title={article.title}
          description={article.description}
          url={article.url}
        />
      )
    })
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <NewArticleForm
            content={this.state.title}
            label='Title of Article'
            name='Title'
            handleFunction={this.handleTitleChange}
          />
          <NewArticleForm
            content={this.state.description}
            label='Description'
            name='Description'
            handleFunction={this.handleDescriptionChange}
          />
          <NewArticleForm
            content={this.state.url}
            label='Link to Article'
            name='Url'
            handleFunction={this.handleUrlChange}
          />
          <div className='button-group'>
            <button className='button' onClick={this.handleClearForm}>Clear</button>
            <input className='button' type='submit' value='Submit'/>
          </div>
        </form>
        <h3>Here are the Articles You Submitted!</h3>
        {newArticle}
      </div>
    )
  }
}

export default ArticlesIndexContainer;
