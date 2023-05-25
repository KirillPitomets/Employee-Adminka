import { FC, PropsWithChildren } from 'react'
// ==== Services ====
import { useCurrentQuery } from '../../app/services/auth'

const Auth: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { isLoading } = useCurrentQuery()

	if (isLoading) return <span>Loading</span>

	return <>{children}</>
}

export default Auth
