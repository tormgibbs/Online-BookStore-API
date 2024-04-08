const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.UUID,
    ref: 'Cart'
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  quantity: Number
})


cartItemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  } 
})


module.exports = mongoose.model('CartItem', cartItemSchema)

// JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNTkwMDU0LCJpYXQiOjE3MTI1MDM2NTQsImp0aSI6IjExOGYzOWRlZmI4MTRhNWZhN2QzNWE5NzQ0ZGEzMWE2IiwidXNlcl9pZCI6OX0._xhUFRGBVLY485PMtvMrpWd7zP4JprZ5uC7jdmd9qnE
// EmmaAdmin  EmmaSela123

// EmmaUser  testemma@gmail.com EmmaSela123
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNTkxMjEyLCJpYXQiOjE3MTI1MDQ4MTIsImp0aSI6IjMyN2QzNTc5YzBkODQyYzliOTBiZGQxZDZmNmFhNmI1IiwidXNlcl9pZCI6MTB9.a-A5RpI2sygTCYXfGpv512GX8HVUPnP1ytEapf6aRto
// 9fb13549-4a8c-433b-bd3f-0f2edf6f1b8f
// 5bfc6ead-0934-4b00-aa57-0d37ddac732a
// 8790101c-08ad-4112-b9ce-860b3bd75ba7


// f78c1370-6612-4d1d-96e5-464442279da0 cart id
// 6612f26343a7bfaf58a0b87b
// 6612f45443a7bfaf58a0b880