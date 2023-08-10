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
  
  useEffect(() => {
    fetch('http://localhost:5000/api/courses') 
    .then(response => response.json())
    .then(data => setCourses(data))
    .catch(error => console.error('Error fetching courses:', error));
   }, []);
  
  return (
    <div className="App">
      <Header />
      {/* Routes */}
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
            {courses.map(course => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
