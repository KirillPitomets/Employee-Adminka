class ApiError extends Error {
	status
	errors

	constructor(status, message, errors = []) {
		super(message)

		this.status = status
		this.errors = errors
	}

	static UnauthorizedError() {
		return new ApiError(401, "User isn't authorized")
	}

	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors)
	}

	static EmptyFields(message, errors = []) {
		return new ApiError(400, message || 'Please, fill in the fields', errors)
	}

	static ServerSideError(message, errors = []) {
		return new ApiError(
			500,
			message || 'Please, wait and try next time',
			errors
		)
	}

	static EmployeesNotFound(
		message = 'Employees not found. Please, wait and try next time, or create an employee',
		errors = []
	) {
		return new ApiError(404, message, errors)
	}
}

module.exports = ApiError
