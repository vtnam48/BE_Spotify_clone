const route = require('express').Router()
const searchHistoryController = require('../controllers/searchHistory.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')

route.get('/searchHistory/all', catchAsync(searchHistoryController.getAllSearchHistorys))
route.get('/searchHistory/:userId/:userId', catchAsync(searchHistoryController.getSearchHistoryByIds))
route.get('/searchHistory/songId/:id', catchAsync(searchHistoryController.getSearchHistoryBySongId))
route.get('/searchHistory/userId/:id', catchAsync(searchHistoryController.getSearchHistoryByUserId))
route.post('/searchHistory', middleware.verifyToken, catchAsync(searchHistoryController.createSearchHistory))
route.put('/searchHistory/:id', middleware.verifyToken, catchAsync(searchHistoryController.updateSearchHistoryByIds))
route.delete('/searchHistory/:id', middleware.verifyToken, catchAsync(searchHistoryController.deleteSearchHistoryByIds))

module.exports = route