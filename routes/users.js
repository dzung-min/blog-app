const express = require('express')

const router = express.Router()
const userController = require('../controllers/user')

router.get('/', (req, res) => {
  res.send('List all users')
})
router.post('/', userController.create)

module.exports = router
