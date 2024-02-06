const express = require('express')
const {loginUser,SignUpUser} = require('../controllers/user')
const router = express.Router()

router.post('/login',loginUser)
router.post('/signup',SignUpUser)

module.exports = router