import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';


function App() {
  const [ user, setUser ] = useState(null);
  
  return (
    <div className="App">
      <Header />
      {/* Routes */}
      <Courses />
      <UserSignIn />
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
