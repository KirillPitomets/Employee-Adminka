import { FC, PropsWithChildren } from 'react'
// ==== Antd ====
import { Button, Form, ButtonProps } from 'antd'

const CustomButton: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	htmlType,
	type,
	onClick,
	danger,
	loading,
	shape,
	icon
}) => {
	return (
		<Form.Item>
			<Button
				htmlType={htmlType}
				type={type}
				onClick={onClick}
				danger={danger}
				loading={loading}
				shape={shape}
				icon={icon}
			>
				{children}
			</Button>
		</Form.Item>
	)
}

export default CustomButton
