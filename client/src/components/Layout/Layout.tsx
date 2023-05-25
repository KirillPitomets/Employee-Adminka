import { FC, PropsWithChildren, useEffect } from 'react'
// ==== Antd ====
import { Layout as AntdLayout } from 'antd'
// ==== Styles ====
import cl from './Layout.module.scss'
import Header from '../Header/Header'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className={cl.container}>
			<Header />

			<AntdLayout.Content
				style={{
					height: '100%',
				}}
			>
				{children}
			</AntdLayout.Content>
		</div>
	)
}

export default Layout
