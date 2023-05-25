import { Employee } from '@prisma/client'
import { ColumnsType } from 'antd/es/table'

export const columns: ColumnsType<Employee> = [
	{
		title: 'Name',
		dataIndex: 'firstName',
		key: 'firstName',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'address',
		dataIndex: 'address',
		key: 'addresss',
	},
]