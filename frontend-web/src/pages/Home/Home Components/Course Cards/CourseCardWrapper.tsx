import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setCurrentCourse } from "../../../../redux/course";
import { Course } from "../../../../redux/courses/coursesSlice";
import CourseCard from "./Course Cards/CourseCard";
import "./CourseCardWrapper.css";

const CourseCardWrapper = () => {
  const courses = useSelector((state: RootState) => state.course.courses);

  return (
    <div className="course-display">
      <h1>Your Courses:</h1>
      <div className="courses-wrapper">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseCardWrapper;
