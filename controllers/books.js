const  booksRouter = require('express').Router()
const Author = require('../models/author')
const Book = require('../models/book')
const { tokenExtractor, userExtractor } = require('../utils/middleware')


// Get all books
booksRouter.get('/', async (request, response) => {
  const { minPrice, maxPrice, genre, minQuantity, search } = request.query
  let query = {}
  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (genre) {
    query.genre = genre;
    console.log(query)
  } else if (minQuantity) {
    query.quantity = { $gte: minQuantity };
  }

  if (search) {
    console.log(search)
    query.title = { $regex: search, $options: 'i' };
  }

  const books = await Book.find(query).populate('author', { name: 1 })
  return response.json(books)
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

  const { author, title, isbn, imageUrl, price, description, genre, quantity } = request.body

  if (
    !author || !title || !isbn || !imageUrl || !price 
    || !description || !genre || !quantity
  ) {
    return response.status(400).json({ error: 'Missing required fields' })
  }
  
  // check if book exists already
  const existingBook = await Book.findOne({ title: title })
  if (existingBook) {
    return response.status(409).json({ error: 'Book already exists' })
  }
  
  
  let authorDoc = await Author.findOne({ name: author })

  if (!authorDoc) {
    authorDoc = new Author({ name: author, books: [] })
  }

  const book = new Book({
    title,
    author: authorDoc._id,
    isbn,
    imageUrl,
    price,
    description,
    genre,
    quantity
  })

  const savedBook = await book.save()
  authorDoc.books = authorDoc.books.concat(savedBook._id)
  await authorDoc.save()
  response.status(201).json(savedBook)


  
  // if (author) {
  //   const authorId = author._id.toString()
  //   const authorInDb = await Author.findById(authorId)

  //   const book = new Book({
  //     title: body.title,
  //     author: author._id.toString(),
  //     isbn: body.isbn,
  //     imageUrl: body.imageUrl,
  //     price: body.price,
  //     description: body.description,
  //     genre: body.genre,
  //     quantity: body.quantity
  //   })

  //   const savedBook = await book.save()
  //   authorInDb.books = author.books.concat(savedBook._id)
  //   await authorInDb.save()
  //   response.status(201).json(savedBook)

  // } else {
  //   response.status(404).send({ error: 'author not found, please add author' })
  // }
})


// DELETE a book
booksRouter.delete('/:id', [tokenExtractor, userExtractor], async (request, response) => {
  const user = request.user
  const bookId= request.params.id

  if (!user.isAdmin) {
    return response.status(403).json({ error: 'Only admins can delete books' })
  }

  // Find the book and delete it
  const deletedBook = await Book.findByIdAndDelete(bookId)
  if (!deletedBook) {
    return response.status(404).json({ error: 'Book not found' })
  }

  // Find the author and remove the book from their list of books
  await Author.updateOne(
    { _id: deletedBook.author },
    { $pull: { books: bookId } }
  )

  response.status(204).end()
  
  // const book = await Book.findById(request.params.id)
  // if (!book) {
  //   return response.status(404).json({ message: 'Book not found' })
  // }

  // const author = await Author.findById(book.author)
  // author.books = author.books.filter(bookId => bookId.toString() !== request.params.id)
  // await author.save()
  // await Book.findByIdAndDelete(request.params.id)
})


// PUT a book
booksRouter.put('/:id', [tokenExtractor, userExtractor], async (request, response) => {
  const bookId= request.params.id
  const user = request.user

  const { title, imageUrl, price, description, genre, quantity } = request.body

  if (!user.isAdmin) {
    return response.status(403).json({ error: 'Forbidden. Only admins can edit books' })
  }


  const book = {
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    genre: genre,
    quantity: quantity
  }

  const updatedBook = await Book.findByIdAndUpdate(bookId, book, { new: true })

  if (!updatedBook) {
    return response.status(404).json({ error: 'Book not found' })
  }
  response.json(updatedBook)
})

module.exports = booksRouter