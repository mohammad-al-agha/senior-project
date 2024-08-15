import { NavLink } from "react-router-dom";
import { setCurrentCourse } from "../../../../../redux/course";
import { useDispatch, useSelector } from "react-redux";
import { Course } from "../../../../../redux/courses/coursesSlice";
import "./CourseCard.css";
import { RootState } from "../../../../../redux/store";
import LinkW from "../../../../../../assets/images/LinkW.svg";
import LinkB from "../../../../../../assets/images/LinkB.svg";
import ClockW from "../../../../../../assets/images/ClockW.svg";
import ClockB from "../../../../../../assets/images/ClockB.svg";
import { useBackgroundIcon } from "../../../../../hooks/useBackgroundIcon";

const CourseCard = ({ course }: { course: Course }) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);
  const icon = useBackgroundIcon(course.icon, isDark);

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
      <div className="course-card-title">
        <h2>{course.courseName}</h2>
        <h3>{course.courseCode}</h3>
      </div>
      <div className={`course-card-body ${icon}`}>
        <div className="course-details">
          <img src={isDark ? LinkW : LinkB} alt="" />
          <h4>Meetink Link: {course.courseMeetingLink}</h4>
        </div>
        <div className="course-details">
          <img src={isDark ? ClockW : ClockB} alt="" />
          <h4>
            Sessions each {course.sessionDate} at {course.time}
          </h4>
        </div>
      </div>
    </NavLink>
  );
};

export default CourseCard;
