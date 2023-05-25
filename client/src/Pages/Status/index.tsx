import { FC } from 'react'
// ==== react router dom  ====
import { Link, useParams } from 'react-router-dom'
// ==== Types ==== 
import { PathsEnum } from '../../types/Routes'
// ==== Constants ====
import { Statues } from './constants'
// ==== Antd ==== 
import { Button, Result, Row } from 'antd'

const Status: FC = () => {
	const { status } = useParams()

	return (
		<Row align='middle' justify='center' style={{ width: '100%' }}>
			<Result
				status={status ? 'success' : 404}
				title={status ? Statues[status] : 'Not found'}
				extra={
					<Button key='dashboard'>
						<Link to={PathsEnum.employees}>Employees</Link>
					</Button>
				}
			/>
		</Row>
	)
}

export default Status
