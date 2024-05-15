const route = require('express').Router()
const searchController = require('../controllers/search.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')


route.get('/search/:keyword', catchAsync(searchController.getSearchResult))
route.get('/search/song/:keyword/:playlistId', catchAsync(searchController.searchForSongOnly))

module.exports = route

