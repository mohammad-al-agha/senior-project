import "./HomeFeed.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const HomeFeed = () => {
  // const { courseId } = useParams();

  const course = useSelector((state: RootState) => state.selectedCourse.course);
  const user = useSelector((state: RootState) => state.user.userType);

  return (
    <div className="home-feed">
      <div className="home-nav">
        <div className="home-nav-section">
          <h2>{course.courseName}</h2>
          <h4>{course.courseCode}</h4>
          <h6>Meeting Link: {course.courseMeetingLink}</h6>
        </div>
        {user === "student" ? (
          <div className="home-nav-section">
            <div className="instructor">
              <h2>{course.courseInstructor.name}</h2>
              <h6>{course.courseInstructor.email}</h6>
            </div>
            <button className="green--button">Request a Meeting</button>
          </div>
        ) : (
          <button className="green--button">Add Material</button>
        )}
      </div>
      {course.courseMaterial === null ? (
        <></>
      ) : (
        course.courseMaterial?.map((material) => {
          return <div className="home-feed-material">{material}</div>;
        })
      )}
    </div>
  );
};

export default HomeFeed;
