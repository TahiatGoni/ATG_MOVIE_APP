import { createSlice } from '@reduxjs/toolkit'


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