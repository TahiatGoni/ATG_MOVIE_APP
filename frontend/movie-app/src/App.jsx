import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage'
import { useSelector } from "react-redux"
import "./index.css";

function App() {

  const auth = useSelector((state) => state.auth.value)
  const [count, setCount] = useState(0)

  
  //If we do not have user credentials we render the login page
  //else we can render the MainPage
  if(auth.username && auth.password) {
    return (
      <>
        <MainPage/>
      </>
    )
  }
  else {
    return (
      <LoginPage/>
    )
  }
}

export default App
