import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'

import loginService from './services/login'

import Notification from './components/notification'

import Togglable from './components/Togglable'

import NewBlog from './components/newBlog'


const App = () => {

  const [blogs, setBlogs] = useState([])

  const [Message, setMessage] = useState(null)

  const [notifycationtype,setType] = useState('message')

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {

    blogService.getAll().then(blogs => {

      blogs.sort((a, b) => b.likes - a.likes)

      setBlogs( blogs )

    })

  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)

    }

  }, [])

  const updateBlogs = blog =>  setBlogs(blogs.concat(blog))

  const updateLikes = id => (async () => {

    const newObject = blogs.find( blog => blog.id === id)

    const returned = await blogService.update(id,{ title:newObject.title, author: newObject.author,url:newObject.url ,likes:newObject.likes+1

    })



    setBlogs(blogs.map(blog => blog.id === returned.id ? returned : blog).sort((a, b) => b.likes - a.likes))

  })

  const deleteBlog = id => (async () => {

    if(window.confirm('delete this one')){

      const respon = await blogService.delet(id)

      if(! respon.error){

        setBlogs(blogs.filter(blog => blog.id !== id))

        handleMessage('success','message',5000)

      }

      else{

        handleMessage('failed','error',5000)

      }

    }

  })

  const handleMessage = (message,type,time) => {

    setMessage(message)

    setType(type)

    setTimeout(() => {

      setMessage(null)

    }, time)

  }

  const handleLogin = async (event) => {

    event.preventDefault()

    try {

      const user = await loginService.login({

        username, password,

      })

      window.localStorage.setItem(

        'loggedBlogappUser', JSON.stringify(user)

      )

      blogService.setToken(user.token)

      setUser(user)

      setUsername('')

      setPassword('')

    } catch (exception) {

      setMessage('Wrong credentials')

      setType('error')

      setTimeout(() => {

        setMessage(null)

      }, 5000)

    }

  }

  const loginForm = () => ( <div>

    <h2>Log in to application</h2>

    <form onSubmit={handleLogin}>

      <div>

      username

        <input

          type="text"

          value={username}

          name="Username"

          onChange={({ target }) => setUsername(target.value)}

        />

      </div>

      <div>

      password

        <input

          type="password"

          value={password}

          name="Password"

          onChange={({ target }) => setPassword(target.value)}

        />

      </div>

      <button type="submit">login</button>

    </form>

  </div>)
  const blogForm = () => (<div>

    <h2>blogs</h2>

    <p>{user.username} logged in

      <button onClick={() =>

      {

        window.localStorage.removeItem('loggedBlogappUser')

        setUser(null)

      }}>logout</button></p>

    <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
      <NewBlog service = {blogService} handleUpdate = {updateBlogs} handleMessage = {handleMessage} blogFormRef = {blogFormRef}></NewBlog>

    </Togglable>

    {blogs.map(blog =>

      <Blog key={blog.id} blog={blog} handleLike = {updateLikes(blog.id)} handleDelet = {deleteBlog(blog.id)}/>

    )}

  </div>)

  return (
    <div>

      <Notification message = {Message} className = {notifycationtype}/>

      {user === null ?

        loginForm() :

        blogForm()

      }

    </div>
  )

}

export default App