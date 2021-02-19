const express = require('express');
const router = express.Router()
const apiRouter = require('./api')

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../utils/auth.js');
const { User } = require('../db/models');








router.use('/api', apiRouter)

module.exports = router