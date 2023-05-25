import { FC, useState } from 'react'
// ==== react router dom  ====
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
// ==== Redux  ====
import {
	useGetEmployeeQuery,
	useRemoveEmployeeMutation,
} from '../../app/services/employees'
import { selectUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
// ==== Utils ====
import { isErrWithMessage } from '../../utils/isErrWithMessage'
// ==== Types ====
import { PathsEnum, StatusEnum } from '../../types/Routes'
// ==== Antd ====
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Descriptions, Divider, Modal, Space } from 'antd'
// ==== Components ====
import Layout from '../../components/Layout/Layout'
import CustomButton from '../../components/UI/CustomButton'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'

const Employee: FC = () => {
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState('')
	const { id } = useParams()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data, isLoading } = useGetEmployeeQuery({ id })
	const [removeEmployee] = useRemoveEmployeeMutation()
	const user = useSelector(selectUser)


	if (isLoading) {
		return <span>Loading...</span>
	}

	if (!data) {
		return <Navigate to={PathsEnum.employees} />
	}

	const handleDeleteEmployee = async () => {
		try {
			await removeEmployee(data?.employee)

			navigate(`${PathsEnum.status}/${StatusEnum.deleted}`)
		} catch (err) {
			if (isErrWithMessage(err)) {
				setErrorMessage(err.data.message)
			}

			setErrorMessage('Unexpected error, please try next time')
		}
	}

	const handleIsModalOpen = () => {
		setIsModalOpen(prev => !prev)
	}

	return (
		<Layout>
			<Descriptions title='Employee Information' bordered>
				<Descriptions.Item label='Name' span={3}>
					{`${data?.employee.firstName} ${data?.employee.lastName}`}
				</Descriptions.Item>
				<Descriptions.Item label='Age' span={3}>
					{`${data?.employee.age}`}
				</Descriptions.Item>
				<Descriptions.Item label='Address' span={3}>
					{`${data?.employee.address}`}
				</Descriptions.Item>
			</Descriptions>
			{user!.id === data?.employee.userId && (
				<>
					<Divider orientation='left'>Actions</Divider>
					<Space>
						<Link to={`${PathsEnum.employeeEdit}/${data?.employee.id}`}>
							<CustomButton
								shape='round'
								type='default'
								icon={<EditOutlined />}
							>
								Edit
							</CustomButton>
						</Link>

						<CustomButton
							shape='round'
							danger
							icon={<DeleteOutlined />}
							onClick={handleIsModalOpen}
						>
							Delete
						</CustomButton>
					</Space>
				</>
			)}
			<ErrorMessage message={errorMessage} />
			<Modal
				title='Confirm deletion'
				open={isModalOpen}
				onOk={handleDeleteEmployee}
				onCancel={handleIsModalOpen}
				okText='Confirm'
				cancelText='Cancel'
			/>
		</Layout>
	)
}

export default Employee
