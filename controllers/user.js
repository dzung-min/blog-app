const User = require('../models/User')

exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.session.flash = {
      type: 'success',
      intro: 'Registered successfully',
      message: 'Enjoy your time with us',
    }
    req.login(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.redirect(303, '/')
    })
    res.redirect(303, '/')
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.keys(error.errors)
        .map((field) => error.errors[field].message)
        .join('. ')
      req.session.flash = {
        type: 'danger',
        intro: 'Validation error',
        message,
      }
      return res.redirect(303, '/register')
    }
    if (error.code === 11000) {
      req.session.flash = {
        type: 'warning',
        intro: 'Conflict',
        message: 'User already exist',
      }
      return res.redirect(303, '/register')
    }
    next(error)
  }
}
