import { FC } from 'react'
// ==== React router dom  ====
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../routers/appRouter'
// ==== Features  ====
import { selectUser } from '../features/auth/authSlice'
// ==== Redux ====
import { useSelector } from 'react-redux'

const publicRouter = createBrowserRouter(publicRoutes)
const privateRouter = createBrowserRouter(privateRoutes)

const MainRouter: FC = () => {
	const user = useSelector(selectUser)
	return (
		<>
			{user ? (
				<RouterProvider router={privateRouter} />
			) : (
				<RouterProvider router={publicRouter} />
			)}
		</>
	)
}

export default MainRouter
