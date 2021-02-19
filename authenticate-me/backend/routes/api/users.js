const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')





//signs up user

// router.post(
//     '',
//     asyncHandler(async (req, res) => {
//         const { email, password, username } = req.body
//         const user = await User.signup({ email, username, password })

//         await setTokenCookie(res, user)

//         return res.json({
//             user,
//         })
//     })
// )

// Sign up
router.post(
    '',
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      console.log("logging req.body:", req.body)
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

module.exports = router;