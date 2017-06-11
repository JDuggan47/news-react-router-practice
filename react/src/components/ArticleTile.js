import React from 'react'

const ArticleTile = (props) => {
  return(
    <div>
      <h4>Name of Article: {props.title}</h4>
      <h5>Description of Article: {props.description}</h5>
    </div>
  )
}

export default ArticleTile
