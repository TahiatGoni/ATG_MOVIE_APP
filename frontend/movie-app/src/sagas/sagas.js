import { call, put, takeEvery, select } from 'redux-saga/effects'
import { setData } from '../features/movieSlice'

//We use one saga to manage the users movies
function* workFetchMovies() {
	const auth = yield select(state=>state.auth.value)

	let headers = new Headers(
		{
			'Authorization': "Basic " + btoa(`${auth.username}:${auth.password}`),
		}
	);
	const fetcher = () => fetch('http://127.0.0.1:8000/movies/', {method: 'GET', headers: headers,})
	const response = yield call(fetcher)
	const formattedResp = yield response.json()
	yield put(setData({data: formattedResp}))	
}

function* movieSaga() {
	yield takeEvery('movies/fetchData', workFetchMovies)
}

export default movieSaga