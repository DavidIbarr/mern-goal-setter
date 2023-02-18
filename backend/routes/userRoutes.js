
// create a user, login, get info from user

const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserData }  = require('../controllers/userController')
const { protectRoute } = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/data', protectRoute, getUserData)

module.exports = router