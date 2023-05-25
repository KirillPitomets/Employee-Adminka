const express = require('express')
const router = express.Router()
// ==== Middleware ====
const authMiddleware = require('../middleware/authMiddleware')
// ==== Controller ====
const EmployeesController = require('../controllers/EmployeesController')


// @route employees/
router.get('/', authMiddleware, EmployeesController.getAll)

router.get('/:id', authMiddleware, EmployeesController.getOne)

router.post('/add', authMiddleware, EmployeesController.add)

router.delete('/remove/:id', authMiddleware, EmployeesController.remove)

router.put('/edit/:id', authMiddleware, EmployeesController.edit)

module.exports = router
