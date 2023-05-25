import { RouteObject } from 'react-router-dom'
import { PathsEnum } from '../types/Routes'
// ==== Pages ====
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Status from '../Pages/Status'
import Employees from '../Pages/Employees'
import NotFound from '../Pages/NotFound/'
import AddEmployee from '../Pages/AddEmployee/AddEmployee'
import Employee from '../Pages/Employee/Employee'
import EditEmployee from '../Pages/EditEmployee/EditEmployee'

export const publicRoutes: RouteObject[] = [
	{
		id: 'employees',
		path: PathsEnum.employees,
		element: <Employees />,
	},
	{
		id: 'Login',
		path: PathsEnum.login,
		element: <Login />,
	},
	{
		id: 'register',
		path: PathsEnum.register,
		element: <Register />,
	},
	{
		id: '404',
		path: '*',
		element: <NotFound />,
	},
]

export const privateRoutes: RouteObject[] = [
	{
		id: 'employees',
		path: PathsEnum.employees,
		element: <Employees />,
	},
	{
		id: 'employeeOne',
		path: `${PathsEnum.employee}/:id`,
		element: <Employee />,
	},
	{
		id: 'employeeAdd',
		path: PathsEnum.employeeAdd,
		element: <AddEmployee/>
	},
	{
		id: 'employeeEdit',
		path: `${PathsEnum.employeeEdit}/:id`,
		element: <EditEmployee/>,
	},
	{
		id: 'status',
		path: `${PathsEnum.status}/:status`,
		element: <Status />,
	},
	{
		id: '404',
		path: '*',
		element: <NotFound />,
	},
]
