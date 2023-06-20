import { createSlice } from '@reduxjs/toolkit'

//User's saved movies need to be stored globally so that
//all components are aware which movies are saved and if 5 movies are saved
export const movieSlice = createSlice({
	name: "movies",
	initialState: {value: {data: []}},
	reducers: {

		setData: (state, action) => {
			state.value = action.payload
		},

		fetchData:  (state, action) => {
			
		}
	},
})

export const {setData, fetchData} = movieSlice.actions;

export default movieSlice.reducer