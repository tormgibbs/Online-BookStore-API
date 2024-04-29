collectionsRouter = require('express').Router()
const Book = require('../models/book')




collectionsRouter.get('/', async (request, response) => {
  const { sort } = request.query
  let sortStage = {}

  if (sort) {
    const sortOptions = sort.split(',').map(option => {
      const [field, order] = option.split(':');
      return { [field]: order === 'desc' ? -1 : 1 };
    })
  
    sortStage = { $sort: Object.assign({}, ...sortOptions) }
  }


  const collection = await Book.aggregate([
    { $group: { _id: '$genre', bookCount: { $sum: 1 } } },
    { $project: { genre: '$_id', bookCount: 1, _id: 0 } },
    sortStage
  ])
  response.json(collection)
})


module.exports = collectionsRouter