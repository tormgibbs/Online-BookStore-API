const cartsRouter = require('express').Router()

const Cart = require('../models/cart')
const CartItem = require('../models/cartItem')
const Book = require('../models/book')


const cartCreateSerializer = (cart) => {
  const createdAt = new Date(cart.createdAt).toISOString().split('T')[0];
  console.log(Cart)
  return {
    id: cart._id,
    items: [],
    createdAt: createdAt,
  }
}

const cartItemCreateSerializer = (cartItem) => {
  return {
    book: cartItem.book,
    quantity: cartItem.quantity
  }
}

const bookSerializer = (book) => {
  return {
    id: book.id,
    title: book.title,
    unitPrice: book.price
  }
}

const cartItemSerializer = (cartItems) => {
  return cartItems.map((item) => {
    return {
      id: item._id,
      book: bookSerializer(item.book),
      quantity: item.quantity,
      totalPrice: item.quantity * item.book.price
    }
  })
}

const cartSerializer  = (cartId, cartItems) => {
  const items = cartItemSerializer(cartItems)
  const totalPrice =  Math.round(items.reduce((total, item) => total + item.totalPrice, 0) * 100) / 100;
  return {
    id: cartId,
    items: items,
    totalPrice
  }
}

// Create a new cart
cartsRouter.post('/', async (request, response) => {
  const cart = await Cart.create({});
  const serializedCart = cartCreateSerializer(cart)
  response.status(201).json(serializedCart)
})


// Get cart
cartsRouter.get('/:cartId', async (request, response) => {
  const { cartId } = request.params

  const cartItems = await CartItem.find({ cart: cartId }).lean().populate('book')

  const serializedCart = cartSerializer(cartId, cartItems)
  response.json(serializedCart)
})

// Get cart items
cartsRouter.get('/:cartId/items', async (request, response) => {
  const { cartId } = request.params
  const cartItems = await CartItem.find({ cart: cartId }).lean().populate('book')

  const serializedCartItems = cartItemSerializer(cartItems)
  response.json(serializedCartItems)
})


// Add items to cart
cartsRouter.post('/:cartId/items', async (request, response) => {
  const { cartId } = request.params
  const body = request.body

  const cartItem = new CartItem({
    cart: cartId,
    book: body.bookId,
    quantity: body.quantity
  })

  // check if book exists
  const book = await Book.findById(body.bookId)
  if (!book) {
    return response.status(404).json({ message: 'Book not found' })
  }

  const newCartItem = await cartItem.save()
  const serializedCartItem = cartItemCreateSerializer(newCartItem)
  response.status(201).json(serializedCartItem)

})


module.exports = cartsRouter