const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// test('blogs are returned as json', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body).toHaveLength(1)
// })

// test('id is unique',async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body[0].id).toBeDefined()
// })

// test('post right', async () => {
//     const newBlog = { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12}
//     const response = await api.post('/api/blogs').send(newBlog).expect(201)
//     expect(response.body.title).toEqual(newBlog.title)
//     expect(response.body.author).toEqual(newBlog.author)
//     expect(response.body.url).toEqual(newBlog.url)
//     expect(response.body.likes).toEqual(newBlog.likes)
// })

// test('post default', async () => {
//     const newBlog =  { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'}
//     const response = await api.post('/api/blogs').send(newBlog).expect(201)
//     expect(response.body.likes).toBe(0)
// })
test('post have', async () => {
    const newBlog =  { author: 'Robert C. Martin', likes: 0}
    const response = await api.post('/api/blogs').send(newBlog).expect(400)
    expect(response)
})

  
afterAll(() => {
    mongoose.connection.close()
})