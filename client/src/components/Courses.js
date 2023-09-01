import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Route, Routes } from 'react-router-dom';
import CreateCourse from './CreateCourse';
import CourseDetail from './CourseDetail';



const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Make the API request when the component mounts
        axios.get('/courses')
            .then(response => {
                setCourses(response.data); // Update state with fetched courses
            })
            .catch(error => {
                console.log('Error fetching and parsing courses', error);
            });
    }, []);

    return (
        <div className="wrap main--grid">
            {courses.map(course => (
                <NavLink to={`${course.id}`} key={course.id} className="course--module course--link">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </NavLink>
            ))}
            <NavLink to="create" className="course--module course--add--module">
                <span className="course--add--title">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 13 13"
                        className="add"
                    >
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                    </svg>
                    New Course
                </span>
            </NavLink>
            <Routes>
                <Route path="courses/:id/*" element={<CourseDetail />} />
                <Route path="courses/create" element={<CreateCourse setCourses={setCourses} />} />
            </Routes>
        </div>
    );
}

export default Courses;