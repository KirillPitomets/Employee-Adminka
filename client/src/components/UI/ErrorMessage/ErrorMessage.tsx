import { FC } from 'react'
// ==== Antd ====
import { Alert } from 'antd'
// ==== Types ====
import { IErrorMessageProps } from './ErrorMessage.interface'

const ErrorMessage: FC<IErrorMessageProps> = ({ message }) => {
	if (!message) return null
	return <Alert message={message} type='error' />
}

export default ErrorMessage
