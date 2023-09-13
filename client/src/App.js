import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';


function App() {
  return (
    <div className="App">
       <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="courses/:id/update" element={<UpdateCourse />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
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
