import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UpdateCourse from './UpdateCourse';
import { Route } from 'react-router-dom';

const CourseDetail = () => {
    const { id } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const navigate = useNavigate(); //get the navigate object

    useEffect(() => {
        axios.get(`/courses/${id}`)
            .then(response => {
                setCourseDetail(response.data);
            })
            .catch(error => {
                console.log('Error fetching course details', error);
            });
    }, [id]);

    const handleDelete = () => {
        //send delete request to delete the course
        axios.delete(`/courses/${id}`)
            .then(response => {
                //navigate to course list after successfully deleting the course
                navigate('/courses');
            })
            .catch(error => {
                console.log('Error deleting course', error);
            });
    };

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                     <NavLink className="button" to="update">
                     Update Course
                     </NavLink>
                    <button className="button" onClick={handleDelete}>
                        Delete Course
                    </button>
                    <NavLink className="button button-secondary" to="courses">
                        Return to List
                    </NavLink>
                </div>
            </div>
            <div className="wrap">
                        <Route path="update" element={<UpdateCourse course={courseDetail} />} />
                        {/* Render course details here */}
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