const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('users',{username: 1, name: 1, id: 1})
    response.json(blogs)
})

notesRouter.post('/', async (request, response) => {
    const body = request.body

    if(!request.token){
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    

    if(!(body.title && body.url)){
        response.status(400)
    }
    else{
        const user = await User.findById(decodedToken.id)
        const blog = new Blog ({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            users: user._id
        })
        const saved = await blog.save()
        user.blogs = user.blogs.concat(saved._id)
        await user.save()

        response.status(201).json(saved)
    }
})

notesRouter.delete('/:id', async (request, response) => {

    if(!request.token){
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    console.log(blog.users.toString())
    if(decodedToken.id.toString() === blog.users.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else{
        response.status(401).json({ error: 'user invalid' })
    }
    
})

notesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes}
    
    const returned = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})

    response.json(returned)
})

module.exports = notesRouter
