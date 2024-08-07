import { NavLink } from "react-router-dom";
import "./CourseCard.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setCurrentCourse } from "../../../../redux/course";

const CourseCardWrapper = () => {
  const courses = useSelector((state: RootState) => state.course.courses);

  const dispatch = useDispatch();

  const changeCourse = (e: any) => {
    console.log("e is" + e);

    dispatch(setCurrentCourse(e));
  };

  return (
    <div className="course-display">
      <h1>Your Courses:</h1>
      <div className="courses-wrapper">
        {courses.map((course) => (
          <NavLink
            to={`course/${course._id}`}
            key={course._id}
            className="course-card"
            onClick={(key) => changeCourse(key)}
          >
            <h3 className="course-card-title">{course.courseName}</h3>
            <div className="course-card-body">
              <h4>Course Code: {course.courseCode}</h4>
              <h4>Meetink Link: {course.courseMeetingLink}</h4>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CourseCardWrapper;
