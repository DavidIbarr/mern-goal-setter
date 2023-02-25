import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { goalService } from './goalService'

const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

export const createGoal = createAsyncThunk(
	'goals/create', async (goalData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await goalService.createGoal(goalData, token)
		} catch(error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message) 
		}
	}
)

export const goalSlice = createSlice({
	name: 'goal',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	/* extraReducers: (builder) => {
		builder
		.addCase(funThunk.pending, (state, action) => {

		})
		.addCase(funThunk.fulfilled, (state, action) => {
			
		})
		.addCase(funThunk.rejected, (state, action) => {
			
		})
	} */
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer