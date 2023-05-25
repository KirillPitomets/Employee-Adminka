import { User } from '@prisma/client'
import { api } from './api'

export type UserDataType = Omit<User, 'id'>

type ResponseAuthDataType = User & { token: string }

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		// mutation - POST
		// query - GET
		login: builder.mutation<ResponseAuthDataType, UserDataType>({
			query: userData => ({
				url: 'user/login',
				method: 'POST',
				body: userData,
			}),
		}),
		register: builder.mutation<ResponseAuthDataType, UserDataType>({
			query: userData => ({
				url: 'user/register',
				method: 'POST',
				body: userData,
			}),
		}),
		current: builder.query<ResponseAuthDataType, void>({
			query: userData => ({
				url: 'user/current',
				method: 'GET',
				body: userData,
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useRegisterMutation,
	useCurrentQuery,
	endpoints: { 
		login, 
		register,
		current
	},
} = authApi
