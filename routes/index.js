const express = require('express')

const router = express.Router()
const authController = require('../controllers/auth')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/login', (req, res, next) => {
  res.render('login', { page: 'login' })
})

router.post('/login', authController.authenticate)

router.get('/register', (req, res) => {
  res.render('register', { page: 'register' })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
