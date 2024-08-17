import { NavLink } from "react-router-dom";
import { Course } from "../../../../../redux/courses/coursesSlice";
import "./SideBarButton.css";
import { useDispatch } from "react-redux";
import { setCurrentCourse } from "../../../../../redux/course";
import { useSideBarIcon } from "../../../../../hooks/useSideBarIcon";

const SideBarButton = ({ course }: { course: Course }) => {
  const dispatch = useDispatch();
  const icon = useSideBarIcon;

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
      <img className="course-img" src={icon(course.icon)} alt="" />
      <h6>{course.courseName}</h6>
    </NavLink>
  );
};

export default SideBarButton;
