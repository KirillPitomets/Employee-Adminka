import { FC } from 'react'
// ==== Antd ====
import { Card, Form, Space } from 'antd'
// ==== Types ====
import { IEmployeeFormProps } from './EmployeeForm.interfaces'
// ==== Components ====
import CustomInput from '../UI/CustomInput/CustomInput'
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage'
import CustomButton from '../UI/CustomButton'

const EmployeeForm: FC<IEmployeeFormProps> = ({
	btnText,
	onFinish,
	title,
	employee,
	error,
}) => {
	return (
		<Card title={title} style={{ width: '30rem' }}>
			<Form
				name='employee-form'
				onFinish={onFinish}
				initialValues={employee}
			>
				<CustomInput type='text' name='firstName' placeholder='First Name' />
				<CustomInput type='text' name='lastName' placeholder='Last Name' />
				<CustomInput type='number' name='age' placeholder='age' />
				<CustomInput type='text' name='address' placeholder='address' />
				<Space>
					{error && <ErrorMessage message={error} />}
					<CustomButton type='primary' htmlType='submit'>{btnText}</CustomButton>
				</Space>
			</Form>
		</Card>
	)
}

export default EmployeeForm
