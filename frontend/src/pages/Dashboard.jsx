import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GoalForm from '../components/GoalForm'

function Dashboard() {
	const navigate = useNavigate()

	const { user } = useSelector((state) => state.auth)

	// if the user is not logged in, redirect to login page
	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	return (
		<>
		<section className='heading'>
			<h1>Welcome {user && user.name}</h1>
			<p>Goals Dashboard</p>
			<GoalForm />
		</section>
		</>
	)
}
export default Dashboard