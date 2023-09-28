import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';



const CreateCourse = ({ setCourses }) => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
    });

    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (!authUser) {
                // Handle the case where the user is not authenticated
                return;
            } else {
                const { emailAddress, password } = authUser; // Extract email and password from authUser

            const encodedCredentials = btoa(`${emailAddress}:${password}`);
            
            //Fetch request to the api to create a new course with the POST method
            const headers = {
                Authorization: `Basic ${encodedCredentials}`,
                'Content-Type': 'application/json',
            };
            console.log(`Email: ${emailAddress}, Password: ${password}`);
            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'POST',
                headers,
                body: JSON.stringify(course), // Convert course object to JSON
            });

        
            if (response.status === 201) {
                // Successfully created course, update the course list
                setCourse(courses => [...courses, course]);
                navigate('/'); // Redirect to the list of courses
            } else if (response.status === 400) {
                const data = await response.json();
                if (data.errors) {
                    setValidationErrors(data.errors)
                }
            } else if (response.status === 500) {
                navigate('/error');
            }
            }

            
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                {validationErrors.length > 0 && ( // Display validation errors conditionally
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            value={course.title}
                            onChange={e => setCourse({ ...course, title: e.target.value })}
                        />
                        <p>By {authUser.firstName} {authUser.lastName}</p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            value={course.description}
                            onChange={e => setCourse({ ...course, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={course.estimatedTime}
                            onChange={e => setCourse({ ...course, estimatedTime: e.target.value })}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={course.materialsNeeded}
                            onChange={e => setCourse({ ...course, materialsNeeded: e.target.value })}
                        />
                    </div>
                </div>
                <button className="button" type="submit">
                    Create Course
                </button>
                <button
                    className="button button-secondary"
                    onClick={() => navigate('/')}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default CreateCourse;