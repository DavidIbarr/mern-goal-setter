import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
	const navigate = useNavigate()

	// initialize redux state
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)
	const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

	// if the user is not logged in, redirect to login page
	useEffect(() => {
		if (isError) {
			console.log(message)
		}
		if (!user) {
			navigate('/login')
		}
		// put the goals from the backend into the goals[] array
		dispatch(getGoals())
		// reset the state and clear the dashboard at the end of the component lifecycle
		return () => {
			dispatch(reset())
		}
	}, [user, navigate, isError, message, dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
		<section className='heading'>
			<h1>Welcome {user && user.name}</h1>
			<p>Goals Dashboard</p>
		</section>
		<GoalForm />
		<section className='content'>
			{goals.length > 0 ? (
				<div className='goals'>
					{goals.map((goal) => (
						<GoalItem key={goal._id} goal={goal} />
					))}
				</div>
			) : (
				<h3>You have not set any goals</h3>
			)
			}
		</section>
		</>
	)
}
export default Dashboard