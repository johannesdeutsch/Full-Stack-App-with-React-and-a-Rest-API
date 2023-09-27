import React from 'react';
import './App.css';
import './styles/global.css';
import { Route, Routes, Navigate } from 'react-router-dom';

import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';



function App() {
  return (
    <div className="App">
       <Header />
      <Routes>
        <Route path="/" element={<Courses />} />  
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/:id/update" element={<UpdateCourse />} />
        </Route>
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route path="error" element={<UnhandledError />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<Navigate to="notfound" />} />
      </Routes>  
    </div>
  );
}

export default App;
