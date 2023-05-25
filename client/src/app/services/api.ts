import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const API_URL = 'http://localhost:7777/api'

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders(headers, { getState }) {
		const token =
			(getState() as RootState).auth.user?.token ||
			localStorage.getItem('token')

		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}
	},
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
	reducerPath: 'splitApi',
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: true,
	endpoints: () => ({}),
})
