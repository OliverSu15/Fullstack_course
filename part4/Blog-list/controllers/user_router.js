const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{url : 1, title : 1, author : 1, id : 1})
    response.json(users)
})

usersRouter.post('/',async (request, response) => {
    const user = new User(request.body)

    if(user.password.length < 3){
        response.status(400).json({error : 'password must be longer than 3'})
    }
    else{
        const saltRounds = 10
        user.password = await bcrypt.hash(user.password,saltRounds)

        const saved = await user.save()

        response.status(201).json(saved)
    }
})




module.exports = usersRouter