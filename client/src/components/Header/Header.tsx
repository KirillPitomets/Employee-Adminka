import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// ==== Features ====
import { logout, selectUser } from '../../features/auth/authSlice'
// ==== Types ====
import { PathsEnum } from '../../types/Routes'
// ==== styles ====
import cl from './Header.module.scss'
// ==== Icons ====
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
// ==== Antd ====
import { Layout as AntLayout, Space, Typography } from 'antd'
// ==== Components ====
import { TeamOutlined } from '@ant-design/icons'
import CustomButton from '../UI/CustomButton'
import { useDispatch, useSelector } from 'react-redux'

const Header: FC = () => {
	const user = useSelector(selectUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onLogoutClick = () => {
		dispatch(logout())
		navigate(PathsEnum.employees)
	}
	return (
		<AntLayout.Header className={cl.header}>
			<Space>
				<Link to={PathsEnum.employees}>
					<CustomButton
						type='link'
						icon={<TeamOutlined className={cl['icon']} />}
					>
						<Typography.Text className={cl.link}>Employees</Typography.Text>
					</CustomButton>
				</Link>
			</Space>
			{user ? (
				<CustomButton
					type='link'
					icon={<LogoutOutlined className={cl['icon']} />}
					onClick={onLogoutClick}
				>
					<Typography.Text className={cl.link}>logout</Typography.Text>
				</CustomButton>
			) : (
				<Space>
					<Link to={PathsEnum.register}>
						<CustomButton
							type='link'
							icon={<UserOutlined className={cl['icon']} />}
						>
							<Typography.Text className={cl.link}>
								Registration
							</Typography.Text>
						</CustomButton>
					</Link>

					<Link to={PathsEnum.login}>
						<CustomButton
							type='link'
							icon={<LoginOutlined className={cl['icon']} />}
						>
							<Typography.Text className={cl.link}>Login</Typography.Text>
						</CustomButton>
					</Link>
				</Space>
			)}
		</AntLayout.Header>
	)
}

export default Header
