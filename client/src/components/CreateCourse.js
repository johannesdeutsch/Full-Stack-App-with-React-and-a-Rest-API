import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = ({setCourses}) => {
    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
    });

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/courses', course);

            if (response.status === 201) {
                // Successfully created course, update the course list
                setCourses(courses => [...courses, course]);
                window.location.href = '/courses'; // Redirect to the list of courses
            } else {
                console.error('Error creating course:', response.data.errors);
            }
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div>
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
                        <p>By Joe Smith</p>
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
                    onClick={() => window.location.href = '/courses'}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default CreateCourse;