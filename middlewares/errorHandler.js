const createError = require('http-errors')

const env = process.env.NODE_ENV || 'development'

exports.notFound = (req, res, next) => {
  next(createError.NotFound())
}

exports.generic = (err, req, res, next) => {
  res.locals.message = err.message || 'Something went wrong'
  res.locals.error = env === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
}
