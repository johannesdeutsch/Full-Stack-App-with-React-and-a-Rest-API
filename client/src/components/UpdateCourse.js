import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const UpdateCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const course = location.state && location.state.course;

    const [updatedCourse, setUpdatedCourse] = useState({
        title: course ? course.title : '',
        description: course ? course.description : '',
        estimatedTime: course ? course.estimatedTime : '',
        materialsNeeded: course ? course.materialsNeeded : '',
    });

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/courses/${id}`, updatedCourse);

            if (response.status === 204) {
                // Successfully updated course
                navigate(`/courses/${id}`); // Redirect to the course detail screen
            } else {
                console.error('Error updating course:', response.data.errors);
            }
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
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
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            defaultValue={updatedCourse.estimatedTime}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            defaultValue={updatedCourse.materialsNeeded}
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