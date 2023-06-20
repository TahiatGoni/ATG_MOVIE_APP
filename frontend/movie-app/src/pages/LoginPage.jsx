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
		  if (xhr.status === 401) {
		    alert(`Login Credentials incorrect or username exists! Try again please!`);
		  } else if(xhr.status === 200) {
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
		  if (xhr.status === 201) { 
		    	console.log(xhr.response)
		    	dispatch(setCredentials({'username': username, 'password': password}))
		  } else { // show the result
		  	alert(`Login Credentials incorrect or username exists! Try again please!`); // e.g. 404: Not Found
		  }
		};
	}

	return(
		<Container fluid>
			<div className="mainLogin">
				<Row className="formRow">	
					<label className="infoLabel" htmlFor="password">If you do not have an account, register using signup to save your username and password</label>
				</Row>
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
				<div className="center"> 
					<Button variant="success" onClick={login}>Login</Button>{' '}
					<Button variant="info" onClick={signup}>Signup</Button>{' '}
				</div>
			</div>
		</Container>
	)
}