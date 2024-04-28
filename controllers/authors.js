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
  const author = await Author.findById(request.params.id).populate('books', { title: 1 }).lean()
  if (author) {
    const transformedAuthor = {
      id: author._id,
      name: author.name,
      // Add other properties as needed
      books: author.books.map(book => ({
        id: book._id,
        title: book.title
      })),
      biography: author.biography
    }
    response.json(transformedAuthor)
  } else {
    response.status(404).end()
  }
})


// POST a new author
authorsRouter.post('/', [tokenExtractor,userExtractor], async (request, response) => {
  const user = request.user
  const { name, biography} = request.body

  if (!user.isAdmin) {
    return response.status(401).json({ error: 'Unauthorized access' })
  }

  
  if (!name) {
    return response.status(400).json({ error: 'Missing required field name' })
  }
  
  const author = new Author({
    name,
    biography
  })

  const savedAuthor = await author.save()
  response.status(201).json(savedAuthor)
})


// DELETE an author
authorsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (!user.isAdmin) {
    return response.status(401).json({ error: 'Unauthorized access' })
  }

  const authorId = request.params.id
  const result = await Author.findByIdAndDelete(authorId)

  if (!result) {
    return response.status(404).send({ message: 'Author not found' })
  }
  
  await Book.deleteMany({ author: authorId})
  response.status(204).send({ message: 'Author and related books deleted successfully' })
})


module.exports = authorsRouter