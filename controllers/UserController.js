const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
// ==== Services ====
const TokenService = require('../Services/TokenServices')
// ==== Constants ====
const tokenConstants = require('../constants/tokens')
// ==== Exceptions ====
const ApiError = require('../exceptions/ApiError')
// ==== Dto ====
const UserDto = require('../dtos/userDTO')

class UserController {
	/**
	 * @route Get /api/user/login
	 * @desc Login user
	 * @access Public
	 **/
	static async login(req, res, next) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				throw ApiError.EmptyFields()
			}

			const user = await prisma.user.findFirst({
				where: {
					email,
				},
			})

			const secret = process.env.JWT_ACCESS_SECRET
			const isPasswordCorrect =
				user && (await bcrypt.compare(password, user.password))

			if (!secret) {
				throw ApiError.ServerSideError()
			}

			if (!user || !isPasswordCorrect) {
				throw ApiError.BadRequest('Wrong email or password ')
			}

			//  Creating a user data obj for client
			const userDto = new UserDto(user)
			const tokens = TokenService.generateTokens({ ...userDto })
			// Find refresh token if found the refresh token do smth
			// const foundRefreshToken = TokenService.findRefreshTokenByUserId(
			// 	userDto.id
			// )

			// if (foundRefreshToken) {
			// 	tokens = foundRefreshToken
			// } else {
			// 	tokens = TokenService.generateTokens({
			// 		...userDto,
			// 	})
			// 	TokenService.saveRefreshTokenInDb(tokens.refreshToken)
			// }

			res.cookie(tokenConstants.cookieRefreshToken, tokens.refreshToken, {
				// 30d, 24h, 60m, 60s, 1000ms
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30d will live. Time in ms
				httpOnly: true,
			})

			return res
				.status(200)
				.json({ user: { ...userDto }, token: tokens.accessToken })
		} catch (err) {
			console.log(err)
			next(err)
		}
	}

	/**
	 * @route Post /api/user/register
	 * @desc Registration a new user
	 * @access Public
	 **/
	static async register(req, res, next) {
		try {
			const { name, email, password } = req.body

			if (!name || !email || !password) {
				throw ApiError.EmptyFields()
			}

			const registeredUser = await prisma.user.findFirst({ where: { email } })

			if (registeredUser) {
				throw ApiError.BadRequest(
					`User with email: "${email}" is already registered`
				)
			}

			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt)

			// Saving the User in the DB
			const user = await prisma.user.create({
				data: { email, name, password: hashedPassword },
			})

			const secret = process.env.JWT_ACCESS_SECRET

			if (!secret) {
				throw ApiError.ServerSideError()
			}

			if (!user) {
				throw ApiError.BadRequest('Sorry, unable to register user')
			}

			// Creating an user data obj for the client
			const userDto = new UserDto(user)
			// refresh / access tokens
			const tokens = TokenService.generateTokens({ ...userDto })
			// Saving the token in the DB
			// TokenService.saveRefreshTokenInDb(tokens.refreshToken)
			// saving refresh in cookie
			res.cookie(tokenConstants.cookieRefreshToken, tokens.refreshToken, {
				// 30d, 24h, 60m, 60s, 1000ms
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30d will live. Time in ms
				httpOnly: true,
			})

			return res.status(200).json({
				user: { ...userDto },
				token: tokens.accessToken,
			})
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
	/**
	 * @route GET api/user/current
	 * @des Current login user
	 * @access Private
	 * **/
	static async current(req, res, next) {
		const userDto = new UserDto({ ...req.user })

		return res.status(200).json({ ...userDto })
	}
}

module.exports = UserController
