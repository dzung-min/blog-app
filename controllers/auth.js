const passport = require('passport')

exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.session.flash = {
        type: 'warning',
        intro: 'Unauthorized',
        message: "Email and password don't match",
      }
      return res.redirect(303, '/login')
    }
    if (!user) {
      req.session.flash = {
        type: 'warning',
        intro: 'Unauthorized',
        message: "Email and password don't match",
      }
      return res.redirect(303, '/login')
    }
    req.logIn(user, function (err) {
      if (err) {
        req.session.flash = {
          type: 'warning',
          intro: 'Unauthorized',
          message: 'Something went wrong',
        }
        return res.redirect(303, '/login')
      }
      return res.redirect(303, '/')
    })
  })(req, res, next)
}
