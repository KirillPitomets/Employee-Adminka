import { FC } from 'react'
// ==== react router dom  ====
import { useNavigate } from 'react-router-dom'
// ==== Types ====
import { PathsEnum } from '../../types/Routes'
// ==== Constants ====
import { columns } from './constants'
// ==== Antd ====
import { Table } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
// ==== Styles ====
import cl from './Employee.module.scss'
// ==== Components ====
import Layout from '../../components/Layout/Layout'
import CustomButton from '../../components/UI/CustomButton'
import { useGetAllEmployeesQuery } from '../../app/services/employees'

const Employees: FC = () => {
	const navigate = useNavigate()
	const { data, isLoading } = useGetAllEmployeesQuery()

	const goToAddUser = () => navigate(PathsEnum.employeeAdd) 

	return (
		<Layout>
			<CustomButton
				type='primary'
				onClick={goToAddUser}
				icon={<PlayCircleOutlined />}
			>
				Add
			</CustomButton>
			<Table
				rowClassName={cl.row}
				loading={isLoading}
				dataSource={data?.employees}
				pagination={false}
				columns={columns}
				rowKey={record => record.id}
				onRow={record => {
					return {
						onClick: () => navigate(`${PathsEnum.employee}/${record.id}`),
					}
				}}
				/>
		</Layout>
	)
}

export default Employees
