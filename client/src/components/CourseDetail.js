import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = ({ match }) => {
    const courseId = match.params.id;
    const [courseDetail, setCourseDetail] = useState(null);
    const history = useHistory(); //get the history object

    useEffect(() => {
        axios.get(`/courses/${courseId}`)
            .then(response => {
                setCourseDetail(response.data);
            })
            .catch(error => {
                console.log('Error fetching course details', error);
            });
    }, [courseId]);

    const handleDelete = () => {
        //send delete request to delete the course
        axios.delete(`/courses/${courseId}`)
            .then(response => {
                //navigate to course list after successfully deleting the course
                history.push('/courses');
            })
            .catch(error => {
                console.log('Error deleting course', error);
            });
    };

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${courseId}/update`}>
                        Update Course
                    </Link>
                    <button className="button" onClick={handleDelete}>
                        Delete Course
                    </button>
                    <Link className="button button-secondary" to="/courses">
                        Return to List
                    </Link>
                </div>
            </div>
            {courseDetail && (
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseDetail.title}</h4>
                            <p>By {courseDetail.user.firstName} {courseDetail.user.lastName}</p>
                            <p>{courseDetail.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetail.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {courseDetail.materialsNeeded.split('\n').map((material, index) => (
                                    material.trim() && <li key={index}>{material.trim().replace(/^\*\s*/, '')}</li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>





            )}
        </>
    );
}

export default CourseDetail;