import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
	name: "auth",
	initialState: {value: {username: null, password: null}},
	reducers: {
		setCredentials: (state, action) => {
			state.value = action.payload
		},

		logOut:  (state) => {
			state.value = {username: null, password: null}
		}
	},
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer
