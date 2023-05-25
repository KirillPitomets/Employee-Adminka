import { FC } from 'react'
// ==== Types ====
import { ICustomInput } from './CustomInput.interface'
// ==== antd ====
import { Form, Input } from 'antd'

const CustomInput: FC<ICustomInput> = ({
	placeholder,
	name,
	type = 'text',
}) => {
	return (
		<Form.Item
			name={name}
			shouldUpdate={true}
			rules={[{ required: true, message: 'Obligatory field' }]}
		>
			<Input placeholder={placeholder} type={type} size='large' />
		</Form.Item>
	)
}

export default CustomInput
