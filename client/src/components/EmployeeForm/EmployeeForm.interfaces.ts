import { Employee } from '@prisma/client'

export interface IEmployeeFormProps { 
	onFinish: (values: Employee) => void
	btnText: "Edit" | "Add"
	title: "Edit Employee" | "Add Employee"
	error?: string
	employee?: Employee
}