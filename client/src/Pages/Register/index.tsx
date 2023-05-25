import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
// ==== Services ====
import { UserDataType, useRegisterMutation } from '../../app/services/auth'
// ==== Utils ====
import { isErrWithMessage } from '../../utils/isErrWithMessage'
// ==== Types ====
import { PathsEnum } from '../../types/Routes'
// ==== Antd ====
import { Card, Form, Row, Space, Typography } from 'antd'
// ==== Components ====
import CustomInput from '../../components/UI/CustomInput/CustomInput'
import PasswordInput from '../../components/UI/PasswordInput/PasswordInput'
import CustomButton from '../../components/UI/CustomButton'
import Layout from '../../components/Layout/Layout'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'

const Register: FC = () => {
	const [registerUser] = useRegisterMutation()
	const [errorMessage, setErrorMessage] = useState('')

	const register = async (data: UserDataType) => {
		try {
			await registerUser(data)
		} catch (err) {
			if (isErrWithMessage(err)) {
				setErrorMessage(err.data.message)
			} else {
				setErrorMessage('Unexpected error. Please, try next time')
			}
		}
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<Card title='Register' style={{ width: '30rem' }}>
					<Form onFinish={register}>
						<CustomInput type='text' name='name' placeholder='Name' />
						<CustomInput type='email' name='email' placeholder='Email' />
						<PasswordInput name='password' placeholder='Password' />
						<PasswordInput
							name='confirmPassword'
							placeholder='Confirm Password'
						/>
						<CustomButton type='primary' htmlType='submit'>
							Register
						</CustomButton>
						<Space direction='vertical' size='large'>
							<Typography.Text>
								Has Account ? <Link to={PathsEnum.login}>Login</Link>
							</Typography.Text>
						</Space>
						<ErrorMessage message={errorMessage} />
					</Form>
				</Card>
			</Row>
		</Layout>
	)
}

export default Register
