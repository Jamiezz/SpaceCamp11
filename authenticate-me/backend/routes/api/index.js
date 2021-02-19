const router = require('express').Router();
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')

router.use('/session', sessionRouter)

router.use('/users', usersRouter)






module.exports = router

// i believe the below commented code is "Once you are satisfied with the test results, you can remove all the code
//for the testing routes for the user auth middlewares." from the end of phase 3

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//       return res.json(req.user);
//     }
//   );

// router.get(
//     '/set-token-cookie',
//     asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     console.log("req.user", req.user)
//     return res.json(req.user);
//   }
// );

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body })
// })
