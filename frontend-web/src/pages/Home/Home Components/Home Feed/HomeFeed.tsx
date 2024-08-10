import "./HomeFeed.css";
import { useHomeFeedLogic } from "./useHomeFeed";

const HomeFeed = () => {
  const {
    handleFileUpload,
    handleUploadMaterial,
    user,
    course,
    hasFile,
    setHasFile,
  } = useHomeFeedLogic();

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
          <div className="instructor-options">
            <button
              onClick={handleUploadMaterial}
              className={hasFile ? "green--button" : "disabled--button"}
            >
              Add Material
            </button>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                setHasFile(true);
                handleFileUpload(e);
              }}
            />
          </div>
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
