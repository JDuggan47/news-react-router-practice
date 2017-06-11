import React from 'react'

const NewArticleForm = props => {
  return (
    <div>
      <label>{props.label}
        <textarea
          name={props.name}
          value={props.content}
          onChange={props.handleFunction}
        />
      </label>
    </div>
  )
}

export default NewArticleForm
