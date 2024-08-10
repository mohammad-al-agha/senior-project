import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
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
