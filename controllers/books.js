const  booksRouter = require('express').Router()
const { json } = require('express')
const Author = require('../models/author')
const Book = require('../models/book')
const { tokenExtractor, userExtractor } = require('../utils/middleware')


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
    response.status(404).send({ message: 'Book not found' })
  }
})


// POST a new book
booksRouter.post('/', [tokenExtractor, userExtractor], async (request, response) => {
  const user = request.user

  if (!user.isAdmin) {
    return response.status(403).json({ error: 'Forbidden. Only admins can add books' })
  }

  const body = request.body

  if (
    !body.author || !body.title 
    || !body.isbn || !body.imageUrl || !body.price 
    || !body.description || !body.genre || !body.quantity
  ) {
    return response.status(400).json({ error: 'Missing required fields' })
  }

  const author = await Author.findOne({ name: body.author }).lean()

  // check if book exists already
  const existingBook = await Book.findOne({ title: body.title })
  if (existingBook) {
    return response.status(409).json({ error: 'Book already exists' })
  }
  
  
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
booksRouter.delete('/:id', [tokenExtractor, userExtractor], async (request, response) => {
  const user = request.user

  if (!user.isAdmin) {
    return response.status(403).json({ error: 'Only admins can delete books' })
  }
  
  const book = await Book.findById(request.params.id)
  if (!book) {
    return response.status(404).json({ message: 'Book not found' })
  }

  const author = await Author.findById(book.author)
  author.books = author.books.filter(bookId => bookId.toString() !== request.params.id)
  await author.save()
  await Book.findByIdAndDelete(request.params.id)
})


// PUT a book
booksRouter.put('/:id', [tokenExtractor, userExtractor], async (request, response) => {

  const user = request.user

  if (!user.isAdmin) {
    return response.status(403).json({ error: 'Forbidden. Only admins can edit books' })
  }

  // check if book exists
  const bookToEdit = await Book.findById(request.params.id)
  if (!bookToEdit) {
    return response.status(404).json({ error: 'Book not found' })
  }

  const body = request.body
  const book = {
    title: body.title,
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