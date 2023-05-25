const jwt = require('jsonwebtoken')
const { prisma } = require('../prisma/prisma-client')

class TokenService {
	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (err) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (err) {
			return null
		}
	}

	/**
	 * @Params payload {...}
	 * @Params accessTokenExpiresIn? = '48h'
	 * @Params refreshTokenExpiresIn = '30d'
	 *
	 * **/
	generateTokens(
		payload,
		accessTokenExpiresIn = '48h',
		refreshTokenExpiresIn = '30d'
	) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: accessTokenExpiresIn,
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: refreshTokenExpiresIn,
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	async findRefreshTokenByUserId(userId) {
		const refreshToken = await prisma.refreshToken.findFirst({
			where: { userId },
		})
		return refreshToken
	}

	// async saveRefreshTokenInDb(refresh) {
	// 	const refreshToken = await prisma.refreshToken.create({ data: { refresh } })
	// 	return refreshToken
	// }
}

module.exports = new TokenService()
