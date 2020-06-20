describe('Blog', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'bnmbnm',
      username: '123456',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('frontpage', () => {
    cy.contains('login')
  })
  it('login', () => {
    cy.contains('login').click()
  })
  it('wrong password', () => {
    cy.contains('login').click()
    cy.get('[name="Username"]').type('123456')
    cy.get('[name="Password"]').type('wrong')
    cy.contains('login').click()
    cy.contains('Wrong credentials')
  })
  it('can login', () => {
    cy.contains('login').click()
    cy.get('[name="Username"]').type('123456')
    cy.get('[name="Password"]').type('123456')
    cy.contains('login').click()
    cy.contains('blogs')
  })
  describe('when login', () => {
    beforeEach(() => {
      cy.get('[name="Username"]').type('123456')
      cy.get('[name="Password"]').type('123456')
      cy.contains('login').click()
    })
    it('created', () => {
      cy.contains('new blog').click()
      cy.get('[name="Title"]').type('Teetle')
      cy.get('[name="Author"]').type('EEthor')
      cy.get('[name="Url"]').type('Eeurl.com')
      cy.contains('creat').click()
      cy.contains('Teetle')
    })
    it('like', () => {
      cy.contains('new blog').click()
      cy.get('[name="Title"]').type('Teetle')
      cy.get('[name="Author"]').type('EEthor')
      cy.get('[name="Url"]').type('Eeurl.com')
      cy.contains('creat').click()
      cy.contains('view').click()
      cy.contains('like').click()
    })
    it('delete', () => {
      cy.contains('new blog').click()
      cy.get('[name="Title"]').type('Teetle')
      cy.get('[name="Author"]').type('EEthor')
      cy.get('[name="Url"]').type('Eeurl.com')
      cy.contains('creat').click()
      cy.contains('view').click()
      cy.contains('delete').click()
    })
    it('order', () => {
      cy.contains('new blog')
      cy.createBlog({ title:'1321',author:'5646',url:'56465',likes:10 })
      cy.createBlog({ title:'89789',author:'98798',url:'9849684',likes:12 })
      cy.get('[name = "blog"]').first().contains('89789')
    })
  })
})