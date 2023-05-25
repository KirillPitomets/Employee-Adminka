import { FC } from 'react'
// ==== Types ====
import { IPasswordInputProps } from './PasswordInput.interface'
// ==== Antd ====
import { Form, Input } from 'antd'

const PasswordInput: FC<IPasswordInputProps> = ({
	name,
	placeholder,
	dependencies,
}) => {
	return (
		<Form.Item
			name={name}
			dependencies={dependencies}
			hasFeedback
			rules={[
				{
					required: true,
					message: 'Obligatory field',
				},
				// Validate function
				({ getFieldValue }) => ({
					validator(_, value) {
						if (!value) {
							return Promise.resolve()
						}

						if (name === 'confirmPassword') {
							// confirmPassword
							if (getFieldValue('password') === value) {
								return Promise.resolve()
							}

							return Promise.reject(
								new Error('The two passwords that you entered do not match')
							)
						} else {
							// Password
							if (value.length < 6 || value.length > 16) {
								return Promise.reject(
									new Error(
										'Password must be more than 6 characters and less that 16 characters'
									)
								)
							}
							return Promise.resolve()
						}
					},
				}),
			]}
		>
			<Input.Password placeholder={placeholder} size='large' />
		</Form.Item>
	)
}

export default PasswordInput
