import { FC, useState } from 'react'
// ==== react router dom ====
import { useNavigate } from 'react-router-dom'
// ==== Types ====
import { PathsEnum, StatusEnum } from '../../types/Routes'
import { Employee } from '@prisma/client'
// ==== Services ====
import { useAddEmployeeMutation } from '../../app/services/employees'
// ==== Utils ====
import { isErrWithMessage } from '../../utils/isErrWithMessage'
// ==== Antd ====
import { Row } from 'antd'
// ==== Components ====
import Layout from '../../components/Layout/Layout'
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'

const AddEmployee: FC = () => {
	const [addEmployee] = useAddEmployeeMutation()
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate()

	const handleAddEmployee = async (values: Employee) => {
		try {
			await addEmployee(values).unwrap()
			navigate(`${PathsEnum.status}/${StatusEnum.created}`)
		} catch (err) {
			if (isErrWithMessage(err)) {
				setErrorMessage(err.data.message)
			}
			setErrorMessage('Unexpected error, please try next time')
		}
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm
					title='Add Employee'
					onFinish={handleAddEmployee}
					error={errorMessage}
					btnText='Add'
				/>
			</Row>
		</Layout>
	)
}

export default AddEmployee
