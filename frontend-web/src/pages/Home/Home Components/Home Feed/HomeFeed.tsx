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
import SpeakerB from "../../../../../assets/images/SpeakerB.svg";
import { counter } from "@fortawesome/fontawesome-svg-core";
import course from "../../../../redux/course";

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
    openUploadDialog,
    closeUploadDialog,
    uploadDialogRef,
    announceDialogRef,
    openAnnounceDialog,
    closeAnnounceDialog,
    time,
    date,
    getIcon,
    isDark,
    today,
    icon,
    message,
    setMessage,
    sendAnnouncement,
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
                onClick={openAnnounceDialog}
              >
                Anncounce
                <img src={SpeakerW} alt="" />
              </button>
              <button
                className="green--button instructor-options-btn"
                onClick={openUploadDialog}
              >
                Upload
                <img src={Upload} alt="Upload" />
              </button>
            </div>
            <dialog className="dialog dialog--announce" ref={announceDialogRef}>
              <div className="announce-dialog-options">
                <h2>Announce</h2>
                <textarea
                  value={message}
                  placeholder={"Type your announcement here..."}
                  className="announcement"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <div className="dialog-buttons">
                  <button
                    className={
                      message === "" ? "disabled--button" : "green--button"
                    }
                    onClick={
                      message === ""
                        ? () => {}
                        : () => {
                            sendAnnouncement();
                            setMessage("");
                            closeAnnounceDialog();
                          }
                    }
                  >
                    Send
                  </button>

                  <button onClick={closeAnnounceDialog} className="red--button">
                    Cancel
                  </button>
                </div>
              </div>
            </dialog>
            <dialog className="dialog dialog--upload" ref={uploadDialogRef}>
              <h2>Upload</h2>
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
                    <button onClick={closeUploadDialog} className="red--button">
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
          (course.courseMaterial.reverse,
          course.courseMaterial.map((material) => {
            return (
              <div key={material._id} className="material-card">
                <div className="material-info-section">
                  <div className="file-type-img">
                    <img
                      src={
                        material.fileType
                          ? getIcon(material.fileType, isDark)
                          : isDark
                          ? SpeakerW
                          : SpeakerB
                      }
                      alt="file-type"
                    />
                  </div>
                  <section className="material-name-type">
                    <h2>{material.description}</h2>
                    <h3>{material.fileName}</h3>
                    <p className="file-section">{material.fileSection}</p>
                  </section>
                </div>
                <section className="material-date-section">
                  <section>
                    <p className="">{date(material.deliverTime)}</p>
                    <p className="">{`${time(material.dueTime)}`}</p>
                  </section>
                  <section className="material-card-buttons">
                    <button className="material-card-button">
                      <img src={isDark ? EyeW : EyeB} alt="" />
                    </button>
                    <button className="material-card-button">
                      <img src={isDark ? DownloadW : DownloadB} alt="" />
                    </button>
                    <button className="material-card-button">
                      <img src={isDark ? CommentsW : CommentsB} alt="" />
                    </button>
                  </section>
                </section>
              </div>
            );
          }))
        ) : (
          <h1>This Course Has No Material Yet</h1>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
