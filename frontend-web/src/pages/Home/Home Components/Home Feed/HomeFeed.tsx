import { useParams } from "react-router-dom";
import "./HomeFeed.css";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setCurrentCourse } from "../../../../redux/course";

const HomeFeed = () => {
  const { courseId } = useParams();

  const course = useSelector((state: RootState) => state.selectedCourse);

  const dispatch = useDispatch();

  const getCourse = {
    method: "GET",
    url: "http://localhost:8000/course/getCourse/?courseId=" + courseId,
  };

  useEffect(() => {
    axios
      .request(getCourse)
      .then((res) => {
        dispatch(setCurrentCourse(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="home-feed">
      <div className="home-nav">
        <div className="home-nav-section">
          <h2>{course.courseName}</h2>
          <h4>{course.courseCode}</h4>
          <h6>Meeting Link: {course.courseMeetingLink}</h6>
        </div>
        <div className="home-nav-section">
          <div className="instructor">
            <h2>{course.courseInstructor.name}</h2>
            <h6>{course.courseInstructor.email}</h6>
          </div>
          <button className="green--button">Request a Meeting</button>
        </div>
      </div>
      {course.courseMaterial.map((material) => {
        return <div className="home-feed-material">{material}</div>;
      })}
    </div>
  );
};

export default HomeFeed;
