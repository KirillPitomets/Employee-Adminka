import React from 'react'
import { createRoot } from 'react-dom/client'
// ==== Antd ====
import { ConfigProvider, theme } from 'antd'
// ==== Redux ====
import { Provider } from 'react-redux'
import { store } from './app/store'
// ==== Styles ====
import './styles/index.scss'
// ==== Features ====
import Auth from './features/auth/Auth'
import MainRouter from './components/MainRouter'

const container = document.getElementById('root')
const root = createRoot(container!)


root.render(
	<Provider store={store}>
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<Auth>
			<MainRouter/>
			</Auth>
		</ConfigProvider>
	</Provider>
)
