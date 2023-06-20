import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import "./css/form.css"
import { useDispatch } from "react-redux"
import { setCredentials } from '../features/authSlice'

export function LoginPage() {

	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')


	const handleUserChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePassChange = (event) => {
		setPassword(event.target.value);
	};

	const login = () => {
		const xhr = new XMLHttpRequest();
		const url='http://127.0.0.1:8000/login/';
		xhr.open("GET", url);
		xhr.setRequestHeader("Authorization", "Basic " + btoa(`${username}:${password}`));
		xhr.send();

		xhr.onload = function() {
		  if (xhr.status === 401) { // analyze HTTP status of the response
		    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		  } else if(xhr.status === 200) { // show the result
		    console.log(xhr.response)
		    dispatch(setCredentials({'username': username, 'password': password}))
		  }
		};
	}

	const signup = () => {
		const xhr = new XMLHttpRequest();
		const url='http://127.0.0.1:8000/signup/';
		xhr.open("POST", url);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(JSON.stringify({"username": username, "password": password}));

		xhr.onload = function() {
		  if (xhr.status === 201) { // analyze HTTP status of the response
		    	console.log(xhr.response)
		    	dispatch(setCredentials({'username': username, 'password': password}))
		  } else { // show the result
		  	alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		  }
		};
	}

	return(
		<Container fluid>
			<Row className="formRow">	
				<Col>
					<label className="formLabel" htmlFor="username">Username: </label>
					<input id="username" type="text" onChange={handleUserChange}/>
				</Col>
			</Row>
			<Row className="formRow">
				<Col>
					<label className="formLabel" htmlFor="password">Password: </label>
					<input id="password" type="password"  onChange={handlePassChange}/>
				</Col>
			</Row>
			<ButtonToolbar className="ButtonBar"> 
				<Button variant="success" onClick={login}>Login</Button>{' '}
				<Button variant="info" onClick={signup}>Signup</Button>{' '}
			</ButtonToolbar>

		</Container>
	)
}