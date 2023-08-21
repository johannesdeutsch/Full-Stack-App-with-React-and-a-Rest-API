import React from 'react';
import logo from './logo.svg';
import './App.css';

import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import Header from './components/Header';


function App() {
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
