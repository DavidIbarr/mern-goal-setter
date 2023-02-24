import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  const navigate = useNavigate()

  // initialize state for the form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
      [e.target.name]: e.target.value
    }))
  }

  // handle form submission, log in existing users
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to Start Setting Goals</p>
      </section>
      <section className="form">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onFormChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onFormChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Login
