const ApiError = require('../exceptions/ApiError')
const { prisma } = require('../prisma/prisma-client')

class EmployeesController {
	/**
	 * @Route Get api/employees
	 * @Des get all employees
	 * @access Private
	 **/
	static async getAll(req, res, next) {
		try {
			const employees = await prisma.employee.findMany()

			if (!employees.length) {
				throw ApiError.EmployeesNotFound()
			}

			return res.status(200).json({ employees })
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
	/**
	 * @Route Get api/employees/:id
	 * @Des get all employees
	 * @access Private
	 **/
	static async getOne(req, res, next) {
		try {
			const { id } = req.params
			if (!id) {
				throw ApiError.BadRequest('Employee ID is required')
			}

			const employee = await prisma.employee.findUnique({ where: { id } })

			if (!employees) {
				throw ApiError.EmployeesNotFound()
			}

			return res.status(200).json({ employee })
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
	/**
	 * @Route post api/employees/add
	 * @Des add an employees
	 * @access Private
	 **/
	static async add(req, res, next) {
		try {
			const { firstName, lastName, address, age } = req.body

			if (!firstName || !lastName || !address || !age) {
				throw ApiError.EmptyFields()
			}

			/* 1 вариант (минусы: нельзя вернуть созданого пользователя через prisma.Employee, потмоу что в prisma нету метода prisma.Employee.findLast())
			Можно обновлять пользователя добавляя в его массив "createdEmployees" новых сторудников
			Тем саммым добавлять пользователей в таблицу "Employees"
			await prisma.user.update({
				where: {
					id: req.user.id,
				},
				data: {
					createdEmployee: {
						create: {
							firstName,
							lastName,
							address,
							age,
						},
					},
				},
			})
			
			const createdEmployee = await prisma.employee.findFirst({
				where: { userId: req.user.id },
			})
			*/

			const createdEmployee = await prisma.employee.create({
				data: {
					firstName,
					lastName,
					address,
					age,
					userId: req.user.id,
				},
			})

			return res.status(201).json({ employee: createdEmployee })
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
	/**
	 * @Route Delete api/employees/remove/:id
	 * @Des Remove an employ by id
	 * @access Private
	 **/
	static async remove(req, res, next) {
		try {
			const { id } = req.params

			if (!id) {
				throw ApiError.BadRequest('Employee ID is required')
			}

			// Find candidate for Delete from the table :)
			// If candidate is not found. Send error message about It
			const employee = await prisma.employee.findUnique({ where: { id } })

			if (!employee) {
				throw ApiError.ServerSideError('Employee was not found')
			}

			const deletedEmployee = await prisma.employee.delete({ where: { id } })
			// Make the obj for send to a client

			return res.status(200).json({
				message: `Employee with name: ${employee.firstName} ${employee.lastName} deleted`,
			})
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
	/**
	 * @Route Put api/employees/edit/:id
	 * @Des Remove an employ
	 * @access Private
	 **/
	static async edit(req, res, next) {
		try {
			const { firstName, lastName, address, age } = req.body
			const { id } = req.params

			if (!id) {
				throw ApiError.BadRequest('Employee ID is required')
			}

			if (!firstName && !lastName && !address && !age) {
				throw ApiError.EmptyFields()
			}

			const updateEmployee = await prisma.employee.update({
				where: { id },
				data: { firstName, lastName, address, age },
			})

			return res.status(200).json({ employee: updateEmployee })
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
}

module.exports = EmployeesController
