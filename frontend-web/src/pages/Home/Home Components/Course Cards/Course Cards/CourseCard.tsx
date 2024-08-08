import { NavLink } from "react-router-dom";
import { setCurrentCourse } from "../../../../../redux/course";
import { useDispatch } from "react-redux";
import { Course } from "../../../../../redux/courses/coursesSlice";
import "./CourseCard.css";

const CourseCard = ({ course }: { course: Course }) => {
  const dispatch = useDispatch();

  const handleCourseChange = () => {
    dispatch(setCurrentCourse(course));
  };
  return (
    <NavLink
      to={`course/${course._id}`}
      key={course._id}
      className="course-card"
      onClick={() => handleCourseChange()}
    >
      <h3 className="course-card-title">{course.courseName}</h3>
      <div className="course-card-body">
        <h4>Course Code: {course.courseCode}</h4>
        <h4>Meetink Link: {course.courseMeetingLink}</h4>
      </div>
    </NavLink>
  );
};

export default CourseCard;
