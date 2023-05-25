import { Employee } from '@prisma/client'
import { api } from './api'

export type EmployeeDataType = Omit<Omit<Employee, 'id'>, 'userId'>

type ResponseEmployeeDataType = { employee: Employee } 
type ResponseEmployeeMessageType = { message: string }

export const employeesApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllEmployees: builder.query<{employees: Employee[]}, void>({
			query: () => ({
				url: 'employees',
				method: 'GET',
			}),
		}),

		getEmployee: builder.query<ResponseEmployeeDataType, {id?: string}>({
			query: ({id}) => ({
				url: `employees/${id}`,
				method: 'GET',
			}),
		}),

		addEmployee: builder.mutation<ResponseEmployeeDataType, EmployeeDataType>({
			query: employee => ({
				url: 'employees/add',
				method: 'POST',
				body: employee,
			}),
		}),

		editEmployee: builder.mutation<ResponseEmployeeDataType, Employee>({
			query: employee => ({
				url: `employees/edit/${employee.id}`,
				method: 'PUT',
				body: employee,
			}),
		}),

		removeEmployee: builder.mutation<ResponseEmployeeMessageType, Employee>({
			query: employee => ({
				url: `employees/remove/${employee.id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useGetAllEmployeesQuery,
	useGetEmployeeQuery,
	useEditEmployeeMutation,
	useAddEmployeeMutation,
	useRemoveEmployeeMutation,
	endpoints: {
		addEmployee,
		removeEmployee,
		editEmployee,
		getAllEmployees,
		getEmployee,
	},
} = employeesApi

