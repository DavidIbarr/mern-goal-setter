import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
	const navigate = useNavigate()

	// initialize state for the form
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const { name, email, password, confirmPassword } = formData

	// initialize redux auth state
	const dispatch = useDispatch()
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

	// detect changes to the auth state
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		// if successful authentication or user has logged in, navigate to dashboard
		else if (isSuccess || user) {
			navigate('/')
		}
		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])
	
	// update form data
	const onFormChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	// handle form submission, register new users
	const onSubmit = (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
		} else {
			const userData = {
				name,
				email,
				password,
			}
			dispatch(register(userData))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form action='' onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='Name'
							onChange={onFormChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Email'
							onChange={onFormChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Password'
							onChange={onFormChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='confirmPassword'
							name='confirmPassword'
							value={confirmPassword}
							placeholder='Confirm password'
							onChange={onFormChange}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	)
}
export default Register
