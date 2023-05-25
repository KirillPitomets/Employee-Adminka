import { User } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '../../app/services/auth'
import { RootState } from '../../app/store'

interface IInitialState {
	user: (User & { token: string }) | null
	isAuthenticated: boolean
}

const initialState: IInitialState = {
	user: null,
	isAuthenticated: false,
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => {
			localStorage.removeItem('token')
			return initialState
		},
	},
	extraReducers: builder => {
		// matchFulfilled = оконченно
		// matchPending = думает
		// matchRejected = ошибка
		// TODO: ознакомиться с документацией
		builder
			.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
				state.user = action.payload
				state.isAuthenticated = true
			})
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					state.user = action.payload
					state.isAuthenticated = true
				}
			)
			.addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
				state.user = action.payload
				state.isAuthenticated = true
			})
	},
})

export const { logout } = slice.actions
export default slice.reducer

export const selectorAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user
