import { NamePath } from 'antd/es/form/interface'

export interface IPasswordInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name:  'password' | 'confirmPassword'
	dependencies?: NamePath[]
}
