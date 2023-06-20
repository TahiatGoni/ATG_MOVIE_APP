import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';
import SlidingPanel from 'react-sliding-side-panel'
import "./css/main.css"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from '../features/authSlice'
import { setData, fetchData } from '../features/movieSlice'


function SidePanelRender(props) {

	const userMovies = useSelector((state) => state.movies.value)
	console.log(userMovies)
	let itemList = []
	for(let item of userMovies.data) {
		itemList.push(<SavedItem item={item}/>)
	}

	return(
		<div className="sidePanel">
			{itemList}
		</div>
	)
}

function SavedItem(props) {

	const auth = useSelector((state) => state.auth.value)
	const dispatch = useDispatch()
	const userMovies = useSelector((state) => state.movies.value)
	let item = props.item

	const del = () => {
		const xhr = new XMLHttpRequest();
		const url=`http://127.0.0.1:8000/movies/${item.id}/`;
		xhr.open("DELETE", url);
		xhr.setRequestHeader("Authorization", "Basic " + btoa(`${auth.username}:${auth.password}`));
		xhr.send();

		xhr.onload = function() {
		  if (xhr.status === 401) {
		    alert(`Error ${xhr.status}: ${xhr.statusText}`);
		  } else if(xhr.status === 200) { 
		    dispatch(fetchData())
		  }
		};

		
	}


	return (
		<div className="resultItem" key={item.id} style={{"background-color": "black"}}>
			<img className="posterImg" src={item["poster"]}/>
			<label>Title: {item["title"]}</label>
			<label>Year: {item["year"]}</label>
			<Row>
				<Button onClick={del} style={{"width": "30%", "margin": "5px auto 5px auto", }} variant="danger">Delete</Button>
			</Row>
		</div>
	)
	
}

function Banner() {
	const userMovies = useSelector((state) => state.movies.value)
	if(userMovies.data && userMovies.data.length === 5){
		return(
			<div className="banner">
				<img src = "/45131.png"/>
				<div className="banner-message">
					<h4>5 Movies Saved!</h4>
				</div>
			</div>
		)
	}
	else {
		return(<></>)
	}
}


function ResultItem(props) {

	const auth = useSelector((state) => state.auth.value)
	const userMovies = useSelector((state) => state.movies.value)
	let item = props.item
	const dispatch = useDispatch()

	const save = () => {
		const xhr = new XMLHttpRequest();
		const url='http://127.0.0.1:8000/movies/';
		xhr.open("POST", url);
		xhr.setRequestHeader("Authorization", "Basic " + btoa(`${auth.username}:${auth.password}`));
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(JSON.stringify(item));

		xhr.onload = function() {
		  if (xhr.status === 401) { // analyze HTTP status of the response
		    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		  } else if(xhr.status === 201) { // show the result
		    dispatch(fetchData())
		  }
		};

		
	}


	if(props.disabled) {
		return (
			<div className="resultItem" key={props.key}>
				<img className="posterImg" src={item["Poster"]}/>
				<label>Title: {item["Title"]}</label>
				<label>Year: {item["Year"]}</label>
				<Row>
					<Button onClick={save} style={{"width": "30%", "margin": "5px auto 5px auto", }} variant="success" disabled>Saved</Button>
				</Row>
			</div>
		)
	}

	return (
		<div className="resultItem" key={props.key}>
			<img className="posterImg" src={item["Poster"]}/>
			<label>Title: {item["Title"]}</label>
			<label>Year: {item["Year"]}</label>
			<Row>
				<Button disabled={userMovies.data.length >= 5} onClick={save} style={{"width": "30%", "margin": "5px auto 5px auto", }}>Save</Button>
			</Row>
		</div>
	)
}

function SearchResult(props) {
	
	const userMovies = useSelector((state) => state.movies.value)
	let itemList = []

	let i = 0
	for(let item of props.data) {
		if(userMovies.data.some(element => element['imdbID']===item["imdbID"])){
			itemList.push(
				<ResultItem key={i} item={item} disabled={true}/>
			)
		}
		else {
			itemList.push(
				<ResultItem key={i} item={item} disabled={false}/>
			)
		}
		i++;
	}

	return(
		<div className="resultList">
			{itemList}
		</div>
	)
}


export function MainPage(props) {
	
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth.value)
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])
	const [searching, setSearching] = useState(false)
	const [openPanel, setOpenPanel] = useState(false)

	useEffect(()=> {
		dispatch(fetchData())
	}, [dispatch])


	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSearch = () => {

		if(search==="") {
			window.alert("Search Term empty! Please type something first!")
			return
		}

		setSearching(true)

		const xhr = new XMLHttpRequest();
		const url = `https://www.omdbapi.com/?s=${search.trim()}&apikey=4a6e6ad8&type=movie`
		xhr.open("GET", url);

		xhr.send();

		xhr.onload = function() {
		  if (xhr.status === 401) { // analyze HTTP status of the response
		    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		  } else if(xhr.status === 200) { // show the result
		  	setSearching(false)
		  	let resp = JSON.parse(xhr.response)
		  	console.log(resp["Search"])
		  	if(resp["Search"]){
		  		setResults(resp['Search'])
		  	}
		  	else {
		  		window.alert("Nothing Found. Search term may be too broad or narrow")
		  		setResults([])
		  		return
		  	}
		    
		  }
		};

	}

	let searchRender = []
	if(searching) {
		searchRender.push(
			<Container className="full">
				<ReactLoading className="center" type="bubbles" color="#ffffff"/>
			</Container>
		)
	}
	else {
		searchRender.push(
			<SearchResult data={results}/>
		)
	}

	const Savetooltip = (
	  <Tooltip id="tooltip1">
	    Saved Movies
	  </Tooltip>
	);

	const Logouttooltip = (
	  <Tooltip id="tooltip2">
	    Logout
	  </Tooltip>
	);

	return(
		<>
		<div className="controlBanner">
		<OverlayTrigger placement="bottom" overlay={Savetooltip}>
			<Button variant="info" id='savedBtn' onClick={()=>{setOpenPanel(true)}}>
				📽️
			</Button>
		</OverlayTrigger>
		<OverlayTrigger placement="bottom" overlay={Logouttooltip}>
			<Button alt="Logout" variant="danger" id='logoutBtn' onClick={()=>{
					dispatch(logOut())
				}}>
					⏻
			</Button>
		</OverlayTrigger>
		</div>
		<Banner/>
		<Container>
			<SlidingPanel
				type={'right'}
				isOpen={openPanel}
				size={30}
			>
				<Button onClick={()=>{setOpenPanel(false)}}>❌</Button>
				<SidePanelRender/>	
			</SlidingPanel>
			<Row className="searchRow">
				<Col sm={8}>
					<input className="searchItem" id="searchBar" type="text" onChange={handleSearchChange}/>
				</Col>
				<Col sm={4}>
					<Button className="searchItem" variant="primary" onClick={handleSearch}>Search 🔎</Button>
				</Col>
			</Row>
			<Row>
				{searchRender}
			</Row>
		</Container>
		</>
	)	
}