const express = require('express');
const router = express.Router()
const apiRouter = require('./api')

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../utils/auth.js');
const { User } = require('../db/models');


router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!')
})






router.use('/api', apiRouter)

module.exports = router