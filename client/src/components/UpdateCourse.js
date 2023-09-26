import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';
import { UserContext } from '../context/UserContext';

const UpdateCourse = () => {
    const { authUser } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const course = location.state && location.state.course;

    const [validationErrors, setValidationErrors] = useState([]);
    const [isCourseOwner, setIsCourseOwner] = useState(false);

    const [updatedCourse, setUpdatedCourse] = useState({
        title: course ? course.title : '',
        description: course ? course.description : '',
        estimatedTime: course ? course.estimatedTime : '',
        materialsNeeded: course ? course.materialsNeeded : '',
    });

    useEffect(() => {
        // Check if the authenticated user is the owner of the course
        if (authUser && course && course.User && authUser.id === course.User.id) {
            setIsCourseOwner(true);
        }
    }, [authUser, course]);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (!authUser || !isCourseOwner) {
                // Handle the case where the user is not authenticated
                navigate('/forbidden');
                return;
            } else {
                const { emailAddress, password } = authUser; // Extract email and password from authUser

                const encodedCredentials = btoa(`${emailAddress}:${password}`);
                const headers = {
                    Authorization: `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/json',
                    // You may include an authorization token if needed, but not user credentials
                    // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
                };
                console.log(updatedCourse);
                const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify(updatedCourse), // Convert course object to JSON
                });

                if (response.status === 204) {
                    // Successfully updated course
                    navigate(`/courses/${id}`); // Redirect to the course detail screen
                } else if (response.status === 400) {
                    // Handle validation errors from the API response
                    const data = await response.json();
                    if (data.errors) {
                        setValidationErrors(data.errors);
                    }
                } else if (response.status === 404) {
                    navigate('/notfound');
                } else if (response.status === 500) {
                    navigate('/error');
                } else {
                console.error('Error updating course:', response.data.errors);
            }
        }
        } catch (error) {
        console.error('Error updating course:', error);
    }
};

return (
    <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
            <ErrorsDisplay errors={validationErrors} />
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input
                        id="courseTitle"
                        name="courseTitle"
                        type="text"
                        value={updatedCourse.title}
                        onChange={e => setUpdatedCourse({ ...updatedCourse, title: e.target.value })}
                    />
                    <p>By Joe Smith</p>
                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea
                        id="courseDescription"
                        name="courseDescription"
                        defaultValue={updatedCourse.description}
                        onChange={e => setUpdatedCourse({ ...updatedCourse, description: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        defaultValue={updatedCourse.estimatedTime}
                        onChange={e => setUpdatedCourse({ ...updatedCourse, estimatedTime: e.target.value })}
                    />
                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        defaultValue={updatedCourse.materialsNeeded}
                        onChange={e => setUpdatedCourse({ ...updatedCourse, materialsNeeded: e.target.value })}
                    />
                </div>
            </div>
            <button className="button" type="submit">
                Update Course
            </button>
            <button
                className="button button-secondary"
                onClick={() => navigate(`/courses/${course.id}`)} // Redirect to course detail
            >
                Cancel
            </button>
        </form>
    </div>
);
}

export default UpdateCourse;