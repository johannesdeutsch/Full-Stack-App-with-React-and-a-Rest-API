import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCourse = ({course}) => {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const [updatedCourse, setUpdatedCourse] = useState({
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded,
    });

    useEffect(() => {
        // Fetch the course details when the component mounts
        axios.get(`/api/courses/${courseId}`)
            .then(response => {
                setUpdatedCourse(response.data); // Update state with fetched course details
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
            });
    }, [courseId]);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.put(`/api/courses/${courseId}`, course);

            if (response.status === 204) {
                // Successfully updated course
                window.location.href = `/courses/${courseId}`; // Redirect to the course detail screen
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
                            defaultValue={
                                "High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.\n\nNot every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.\n\nOur pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.\n\nWe made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.\n\nAs for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.\n\nThe specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports."
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            defaultValue="14 hours"
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            defaultValue={
                                "* 1/2 x 3/4 inch parting strip\n\n* 1 x 2 common pine\n\n* 1 x 4 common pine\n\n* 1 x 10 common pine\n\n* 1/4 inch thick lauan plywood\n\n* Finishing Nails\n\n* Sandpaper\n\n* Wood Glue\n\n* Wood Filler\n\n* Minwax Oil Based Polyurethane"
                            }
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