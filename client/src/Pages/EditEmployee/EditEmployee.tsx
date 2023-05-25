import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// ==== redux ====
import {
	useEditEmployeeMutation,
	useGetEmployeeQuery,
} from '../../app/services/employees'
// ==== Types ====
import { PathsEnum, StatusEnum } from '../../types/Routes'
import { Employee } from '@prisma/client'
// ==== Utils ====
import { isErrWithMessage } from '../../utils/isErrWithMessage'
// ==== antd ====
import { Row } from 'antd'
// ==== Components ====
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import Layout from '../../components/Layout/Layout'

const EditEmployee: FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { data, isLoading } = useGetEmployeeQuery({ id: id || '' })
	const [editEmployee] = useEditEmployeeMutation()
	const [errorMessage, setErrorMessage] = useState('')

	const handleEditEmployee = async (values: Employee) => {
		try {
			await editEmployee({
				...data?.employee!,
				...values,
			})

			navigate(`${PathsEnum.status}/${StatusEnum.edited}`)
		} catch (err) {
			if (isErrWithMessage(err)) {
				setErrorMessage(err.data.message)
			}
			setErrorMessage('Unexpected error, please try next time')
		}
	}

	if (isLoading) {
		return <span>Loading...</span>
	}
	if (!data?.employee) {
		;<Layout>
			<Row align='middle' justify='center'></Row>
		</Layout>
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm
					title='Edit Employee'
					btnText='Edit'
					onFinish={handleEditEmployee}
					error={errorMessage}
					employee={data?.employee!}
				/>
			</Row>
		</Layout>
	)
}

export default EditEmployee
