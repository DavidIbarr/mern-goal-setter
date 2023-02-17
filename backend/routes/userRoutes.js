
// create a user, login, get info from user

const express = require('express')
const router = express.Router()
const { registerUser, getUserData, loginUser }  = require('../controllers/userController')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/data', getUserData)

module.exports = router