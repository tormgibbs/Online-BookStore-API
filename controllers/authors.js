const authorsRouter = require('express').Router()

const Author = require('../models/author')
const Book = require('../models/book')

const { tokenExtractor, userExtractor } = require('../utils/middleware')


// GET all authors
authorsRouter.get('/', async (request, response) => {
  const authors = await Author.find({}).populate('books', { title: 1 })
  response.json(authors)
})


// GET a single author
authorsRouter.get('/:id', async (request, response) => {
  const author = await Author.findById(request.params.id).populate('books', { title: 1 })
  if (author) {
    response.json(author)
  } else {
    response.status(404).end()
  }
})


// POST a new author
authorsRouter.post('/', [tokenExtractor,userExtractor], async (request, response) => {
  const user = request.user

  if (!user.isAdmin) {
    return response.status(401).json({ error: 'Authentication credentials were not provided' })
  }

  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ error: 'Missing required field name' })
  }
  
  const author = new Author({
    name: body.name,
    biography: body.biography
  })

  const savedAuthor = await author.save()
  response.status(201).json(savedAuthor)
})


// DELETE an author
authorsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (!user.isAdmin) {
    return response.status(401).json({ error: 'Authentication credentials were not provided' })
  }

  const authorId = request.params.id
  const author = await Author.findById(authorId)

  if (!author) {
    return response.status(404).send({ message: 'Author not found' })
  }

  await Author.findByIdAndDelete(authorId)
  await Book.deleteMany({ author: authorId})
  response.status(204).send({ message: 'Author and related books deleted successfully' })

})


module.exports = authorsRouter