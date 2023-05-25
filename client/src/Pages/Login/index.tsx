import { FC, useState } from 'react'
// ==== Types ====
import { PathsEnum } from '../../types/Routes'
import { UserDataType } from '../../app/services/auth'
// ==== Hook ====
import { useLoginMutation } from '../../app/services/auth'
// ==== Utils ====
import { isErrWithMessage } from '../../utils/isErrWithMessage'
// ==== Antds ====
import { Row, Form, Card, Space, Typography } from 'antd'
// ==== Components ====
import Layout from '../../components/Layout/Layout'
import CustomInput from '../../components/UI/CustomInput/CustomInput'
import PasswordInput from '../../components/UI/PasswordInput/PasswordInput'
import CustomButton from '../../components/UI/CustomButton'
import { Link, useNavigate} from 'react-router-dom'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'

const Login: FC = () => {
	const navigate = useNavigate()
	const [loginUser, loginUserResult] = useLoginMutation()
	const [errorMessage, setErrorMessage] = useState('')

	const login = async (data: UserDataType) => {
		try {
			await loginUser(data).unwrap()

			navigate(PathsEnum.employees)
		} catch (err) {
			if (isErrWithMessage(err)) {
				setErrorMessage(err.data.message)
			} else {
				setErrorMessage('Unexpected error. Please try in next time')
			}
		}
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<Card title='Login' style={{ width: '30rem' }}>
					<Form onFinish={login}>
						<CustomInput type='email' name='email' placeholder='Email' />
						<PasswordInput name='password' placeholder='Password' />
						<CustomButton type='primary' htmlType='submit'>
							Login
						</CustomButton>
						<Space direction='vertical' size='large'>
							<Typography.Text>
								No Account ? <Link to={PathsEnum.register}>Register</Link>
							</Typography.Text>
							<ErrorMessage message={errorMessage} />
						</Space>
					</Form>
				</Card>
			</Row>
		</Layout>
	)
}

export default Login
