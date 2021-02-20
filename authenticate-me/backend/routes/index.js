const express = require('express');
const router = express.Router()
const apiRouter = require('./api')

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../utils/auth.js');
const { User } = require('../db/models');

router.use('/api', apiRouter)

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({});
    });
  }

if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    //serve the frontends index.html at the root route
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        return res.sendFile(
            path.resolve(_dirname, '../../frontend', 'build', 'index.html')
        )
    })

    //serves the static assets in the frontends build folder
    router.use(express.static(path.resolve("../frontend/build")))

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}




module.exports = router