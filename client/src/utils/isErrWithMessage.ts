import { ErrorWithMessage } from '../types/types'

export const isErrWithMessage = (err: unknown): err is ErrorWithMessage => {
	return (
		typeof err === 'object' &&
		err !== null &&
		'data' in err &&
		typeof (err as Record<string, unknown>).data === 'object'
	)
}
