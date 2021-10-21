const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/login', (req, res, next) => {
  res.render('login', { page: 'login' })
})

router.get('/register', (req, res) => {
  res.render('register', { page: 'register' })
})

module.exports = router
