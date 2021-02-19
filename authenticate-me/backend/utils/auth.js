const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config')
const { User } = require('../db/models')

const { secret, expiresIn } = jwtConfig

const setTokenCookie = (res, user) => {
    //creates the token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) },
    )

    const isProduction = process.env.NODE_ENV === "production"

    // sets the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, //maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax",
    })
    return token
}



const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      console.log("err:", err)
      console.log("jwtPayload:", jwtPayload)
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        console.log("id:", id)
        req.user = await User.scope('currentUser').findByPk(id);
      } catch (e) {
        console.log("im here in catch, logging 'e'", e)
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  };

const requireAuth = [
    restoreUser,
    function (req,res, next) {
        if (req.user) return next()

        const err = new Error('Unauthorized')
        err.title = 'Unauthorized'
        err.errors = ['Unauthorized']
        err.status = 401
        return next(err)
    }
]

module.exports = { setTokenCookie, restoreUser, requireAuth }