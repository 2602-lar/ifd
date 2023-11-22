import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthProvider} from './AuthContext'
import {Home} from './Home'
import { Login } from './Login'
import { AppHome } from './AppHome'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
<Router>
  <Routes>
    <Route path='/' element = {<Home/>}/>
  </Routes>
  <AuthProvider>
<Routes>
  <Route path = '/login' element = {<Login/>}/>
  <Route path = '/apphome' element= {<AppHome/>}/>
</Routes>
  </AuthProvider>
  <ToastContainer/>
</Router>
  );
}

export default App;
