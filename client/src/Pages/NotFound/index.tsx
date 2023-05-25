import { FC, useEffect } from 'react'
// ==== react router dom ====
import { useNavigate } from 'react-router-dom'
// ====  Types ====
import { PathsEnum } from '../../types/Routes'
// ==== Styles ====

const NotFound: FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate(PathsEnum.employees)
	})

	return null
}

export default NotFound
