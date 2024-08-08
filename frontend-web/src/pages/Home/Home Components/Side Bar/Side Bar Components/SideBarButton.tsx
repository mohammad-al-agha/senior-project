import { NavLink } from "react-router-dom";
import { Course } from "../../../../../redux/courses/coursesSlice";
import "./SideBarButton.css";
import { useDispatch } from "react-redux";
import { setCurrentCourse } from "../../../../../redux/course";

const SideBarButton = ({ course }: { course: Course }) => {
  const dispatch = useDispatch();

  const handleCourseChange = () => {
    dispatch(setCurrentCourse(course));
  };

  return (
    <NavLink
      to={`/home/course/${course._id}`}
      key={course._id}
      className="side-bar-btn"
      onClick={handleCourseChange}
    >
      {course.courseName}
    </NavLink>
  );
};

export default SideBarButton;
