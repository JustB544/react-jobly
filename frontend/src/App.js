import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import NavBar from './NavBar';
import React, { useEffect, useState } from 'react';
import UserContext from './UserContext';
import './App.css';
import JoblyApi from './api';

function App() {
  const [context, _setContext] = useState({token: localStorage.getItem("token") || "", username: localStorage.getItem("username") || ""});
  JoblyApi.token = context.token;

  function setContext(token = context.token, username = context.username){
    _setContext(c => ({token, username}));
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    JoblyApi.token = token;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{context, setContext}}>
        <NavBar />
        <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/companies' element={<CompanyList />}/>
            <Route path='/companies/:name' element={<CompanyDetail />}/>
            <Route path='/jobs' element={<JobList searchBar={false}/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='*' element={<Navigate to='/'/>}/>
          </Routes>
        </main>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
