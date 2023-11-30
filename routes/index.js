const express = require('express') 
const { Login, Register, getUsers } = require('../controllers/Users')
const { verifyToken } = require('../middleware/verifyToken')
const { refreshToken } = require('../controllers/RefreshToken')

const router = express.Router()

router.get('/users', verifyToken ,getUsers)
router.post('/register', Register)
router.post('/login', Login)
router.get('/token', refreshToken)

module.exports = router