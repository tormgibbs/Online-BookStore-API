const  booksRouter = require('express').Router()
const { json } = require('express')
const Author = require('../models/author')
const Book = require('../models/book')


// Get all books
booksRouter.get('/', async (request, response) => {
  const books = await Book.find({}).populate('author', { name: 1 })
  response.json(books)
})


// GET a single book
booksRouter.get('/:id', async (request, response) => {
  const book = await Book.findById(request.params.id).populate('author', { name: 1 })
  if (book) {
    response.json(book)
  } else {
    response.status(404).end()
  }
})


// POST a new book
booksRouter.post('/', async (request, response) => {
  const body = request.body

  const author = await Author.findOne({ name: body.author }).lean()
  
  
  if (author) {
    const authorId = author._id.toString()
    const authorInDb = await Author.findById(authorId)

    const book = new Book({
      title: body.title,
      author: author._id.toString(),
      isbn: body.isbn,
      imageUrl: body.imageUrl,
      price: body.price,
      description: body.description,
      genre: body.genre,
      quantity: body.quantity
    })

    const savedBook = await book.save()
    authorInDb.books = author.books.concat(savedBook._id)
    await authorInDb.save()
    response.status(201).json(savedBook)

  } else {
    response.status(404).send({ error: 'author not found, please add author' })
  }
})


// DELETE a book
booksRouter.delete('/:id', async (request, response) => {
  const book = await Book.findById(request.params.id)
  if (!book) {
    return response.status(404).json({ message: 'Book not found' })
  }

  await Book.findByIdAndDelete(request.params.id)
})


// PUT a book
booksRouter.put('/:id', async (request, response) => {
  const body = request.body
  const book = {
    title: body.title,
    author: body.author,
    isbn: body.isbn,
    imageUrl: body.imageUrl,
    price: body.price,
    description: body.description,
    genre: body.genre,
    quantity: body.quantity
  }
  const updatedBook = await Book.findByIdAndUpdate(request.params.id, book, { new: true })
  response.json(updatedBook)
})

module.exports = booksRouter