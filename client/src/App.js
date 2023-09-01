import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';


function App() {
  const location = useLocation();
  console.log('Current Location:', location.pathname);
  return (
    <div className="App">
       <Header />
      <Routes>
        <Route path="/*" element={<Courses />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
      </Routes> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="course-list">
          <h2>Course List</h2>
          <ul>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
