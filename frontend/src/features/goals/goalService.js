import axios from 'axios'

const API_URL = '/api/goals'

const createGoal = async (goalData, token) => {
	const response = axios.post(API_URL, goalData)
	if (response.data) {

	}
	return response.data
}