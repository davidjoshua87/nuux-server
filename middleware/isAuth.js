const jwt = require('jsonwebtoken');

module.exports = {
  auth(req, res, next) {
    if (req.headers.token !== 'null') {
      const token = req.headers.token
      let decode = jwt.verify(token, process.env.SECRET)
      if (!decode) {
        res.status(401).json({
          message: "Not Authenticated!"
        })
      }
      next()
    } else {
      res.status(500).json({
        message: "Internal Server Error!"
      })
      next('error')
    }
  }
}
