import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import CourseCard from "./Course Cards/CourseCard";
import "./CourseCardWrapper.css";

const CourseCardWrapper = () => {
  const courses = useSelector((state: RootState) => state.course.courses);
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);

  return (
    <div className="course-display">
      <div
        className={`home-nav ${isDark ? "home-nav--dark" : "home-nav--light"}`}
      >
        <h2>Your Courses:</h2>
      </div>
      <div className="courses-wrapper">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseCardWrapper;
