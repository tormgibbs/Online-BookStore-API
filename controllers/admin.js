const bcrypt = require('bcrypt')
const adminRouter = require('express').Router()
const User = require('../models/user')



adminRouter.post('/', async (request, response) => {
  const { username, name, password, email } = request.body

  if (password.length < 5 || username.length < 5) {
    return response.status(400).json({ error: 'username and password must be at least 5 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password: passwordHash,
    email,
    isAdmin: true
  })

  const newAdmin = await user.save()
  response.status(201).json(newAdmin)
})


module.exports = adminRouter
