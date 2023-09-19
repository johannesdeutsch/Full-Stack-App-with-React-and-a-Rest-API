import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';


const CourseDetail = () => {
    const navigate = useNavigate(); //get the navigate object
    const { id } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const { authUser } = useContext(UserContext);


    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                setCourseDetail(response.data);
            })
            .catch(error => {
                console.log('Error fetching course details', error);
            });
    }, [id]);

    const handleDelete = () => {
        //send delete request to delete the course
        axios.delete(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                //navigate to course list after successfully deleting the course
                navigate('/courses');
            })
            .catch(error => {
                console.log('Error deleting course', error);
            });
    };

    const isCourseOwner = () => {
        return authUser && courseDetail && courseDetail.user && authUser.id === courseDetail.user.id;
    };

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    {isCourseOwner() && ( // Conditionally render based on ownership
                        <NavLink className="button" to={`/courses/${id}/update`} state={{ course: courseDetail }}>
                            Update Course
                        </NavLink>
                    )}
                    {isCourseOwner() && ( // Conditionally render based on ownership
                        <button className="button" onClick={handleDelete}>
                            Delete Course
                        </button>
                    )}
                    <NavLink className="button button-secondary" to="/">
                        Return to List
                    </NavLink>
                </div>
            </div>
            {courseDetail && (
                <div className="wrap">
                    {/* Render course details here */}
                </div>
            )}
            {courseDetail && (
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseDetail.title}</h4>
                            {courseDetail.user && (
                                <p>By {courseDetail.user.firstName} {courseDetail.user.lastName}</p>
                            )}
                            <p>{courseDetail.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetail.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {courseDetail.materialsNeeded?.split('\n').map((material, index) => (
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