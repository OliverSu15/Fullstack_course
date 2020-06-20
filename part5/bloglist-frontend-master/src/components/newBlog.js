import React, { useState } from 'react'

const NewBlog = ({ service,handleUpdate,handleMessage,blogFormRef }) => {

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const handleCreat = async(event) => {
    event.preventDefault()
    try{
      blogFormRef.current.toggleVisibility()

      const blog = await service.create(
        { title:title, author: author,url:url }
      )

      handleUpdate(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (exception) {
      handleMessage('failed','error',5000)

    }
  }

  return (
    <div>
      <h2>Creat new</h2>
      <form onSubmit={handleCreat}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">creat</button>
      </form>
    </div>
  )
}

export default NewBlog