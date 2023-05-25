const ApiError = require('../exceptions/ApiError')
const { prisma } = require('../prisma/prisma-client')
// ==== Services ====
const TokenService = require('../Services/TokenServices')

const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const decodedUserData = TokenService.validateAccessToken(token)
		if (!decodedUserData) {
			throw ApiError.UnauthorizedError()
		}

		req.user = decodedUserData
		next()
	} catch (err) {
		next(err)
	}
}

module.exports = authMiddleware
