const express = require('express')
const router = express.Router()
// ==== Middleware ====
const authMiddleware = require('../middleware/authMiddleware')
// ==== Controller ====
const UserController = require('../controllers/UserController')

// api/user/login
router.post('/login', UserController.login)
// api/user/register
router.post('/register', UserController.register)
// api/user/current
router.get('/current', authMiddleware, UserController.current)

module.exports = router
