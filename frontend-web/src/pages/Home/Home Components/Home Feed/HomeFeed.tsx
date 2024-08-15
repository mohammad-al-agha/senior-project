import "./HomeFeed.css";
import { useHomeFeedLogic } from "./useHomeFeedLogic";
import Upload from "../../../../../assets/images/Upload.svg";
import EyeW from "../../../../../assets/images/EyeW.svg";
import EyeB from "../../../../../assets/images/EyeB.svg";
import DownloadW from "../../../../../assets/images/DownloadW.svg";
import DownloadB from "../../../../../assets/images/DownloadB.svg";
import CommentsW from "../../../../../assets/images/CommentsW.svg";
import CommentsB from "../../../../../assets/images/CommentsB.svg";
import SpeakerW from "../../../../../assets/images/SpeakerW.svg";
import { ThemeType } from "../../../../core/types/themeTypes";

const HomeFeed = () => {
  const {
    handleUploadMaterial,
    user,
    course,
    hasFile,
    getInputProps,
    getRootProps,
    isDragActive,
    preview,
    removeFiles,
    openDialog,
    closeDialog,
    dialogRef,
    time,
    date,
    getIcon,
    isDark,
    today,
    icon,
  } = useHomeFeedLogic();

  return (
    <div className="home-feed">
      <div className={`home-nav ${icon}`}>
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
          <>
            <div className="instructor-options">
              <button
                className="green--button instructor-options-btn"
                onClick={openDialog}
              >
                Anncounce
                <img src={SpeakerW} alt="" />
              </button>
              <button
                className="green--button instructor-options-btn"
                onClick={openDialog}
              >
                Upload
                <img src={Upload} alt="Upload" />
              </button>
            </div>
            <dialog className="dialog" ref={dialogRef}>
              <div className="dialog-options">
                <div className="dialog-left-section">
                  <div className="dialog-section">
                    <label htmlFor="types">File Type:</label>
                    <select name="types" className="dropdown-menu">
                      <option value={"Quiz"}>Quiz</option>
                      <option value={"Assignment"}>Assignment</option>
                      <option value={"Exam"}>Exam</option>
                    </select>
                  </div>
                  <div className="dialog-section">
                    <label htmlFor="dateTime">Due Date:</label>
                    <input
                      // className={isDark ? "date-picker--dark" : ""}
                      type="datetime-local"
                      name="dateTime"
                      min={today}
                      defaultValue={today}
                    />
                  </div>
                </div>
                <div className="dialog-right-section">
                  <div className="drop-zone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p className="drop-zone-area">Drop the files here...</p>
                    ) : (
                      <p className="drop-zone-area ">
                        Drag & drop some files here, or click to select files
                      </p>
                    )}
                  </div>
                  {preview ? (
                    <div className="dialog-preview">
                      <h6>{preview as string}</h6>
                      <button
                        onClick={removeFiles}
                        className={preview ? "red--button" : "disabled--button"}
                      >
                        Remove Files
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="dialog-buttons">
                    <button
                      onClick={hasFile ? handleUploadMaterial : () => {}}
                      className={hasFile ? "green--button" : "disabled--button"}
                    >
                      Send
                    </button>
                    <button onClick={closeDialog} className="red--button">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </>
        )}
      </div>
      <div className="home-feed-material">
        {course.courseMaterial.length > 0 ? (
          course.courseMaterial.map((material) => {
            return (
              <div className="material-cards">
                <div key={material._id} className="material-card">
                  <div className="material-info-section">
                    <div className="file-type-img">
                      <img
                        src={getIcon(material.fileType, isDark)}
                        alt="file-type"
                      />
                    </div>
                    <section className="material-name-type">
                      <h3>{material.fileName}</h3>
                      <p className="file-section">{material.fileSection}</p>
                    </section>
                  </div>
                  <section className="material-date-section">
                    <p className="">{date(material.deliverTime)}</p>
                    <p className="">{`${time(material.dueTime)}`}</p>
                  </section>
                </div>
                <div className="material-card-buttons">
                  <div className="material-card-button material-card-button--eye">
                    <img src={isDark ? EyeW : EyeB} alt="" />
                  </div>
                  <div className="material-card-button material-card-button--download">
                    <img src={isDark ? DownloadW : DownloadB} alt="" />
                  </div>
                  <div className="material-card-button material-card-button--commnets">
                    <img
                      src={isDark === ThemeType.dark ? CommentsW : CommentsB}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>This Course Has No Material Yet</h1>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
