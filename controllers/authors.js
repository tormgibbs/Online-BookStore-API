const authorsRouter = require('express').Router()

const Author = require('../models/author')
const Book = require('../models/book')
const logger = require('../utils/logger')


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
authorsRouter.post('/', async (request, response) => {
  const body = request.body

  const author = new Author({
    name: body.name,
    biography: body.biography
  })

  const savedAuthor = await author.save()
  response.status(201).json(savedAuthor)
})


// DELETE an author
authorsRouter.delete('/:id', async (request, response) => {
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