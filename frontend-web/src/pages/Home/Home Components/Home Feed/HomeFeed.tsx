import "./HomeFeed.css";
import { useHomeFeedLogic } from "./useHomeFeedLogic";
import Upload from "../../../../../assets/images/Upload.svg";

import DownloadW from "../../../../../assets/images/DownloadW.svg";
import DownloadB from "../../../../../assets/images/DownloadB.svg";
import CommentsW from "../../../../../assets/images/CommentsW.svg";
import CommentsB from "../../../../../assets/images/CommentsB.svg";
import SpeakerW from "../../../../../assets/images/SpeakerW.svg";
import SpeakerB from "../../../../../assets/images/SpeakerB.svg";
import NoFiles from "../../../../../assets/images/NoFiles.svg";
import AnnounceDialog from "../../../../components/Dialogs/Announce Dialog/AnnounceDialog";
import UploadDialog from "../../../../components/Dialogs/Upload Dialog/UploadDialog";

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
    setDateTime,
    setFileSection,
    setUploadMessage,
    loadFile,
    setFileName,
    setFilePath,
    setFileType,
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
            <AnnounceDialog
              announceDialogRef={announceDialogRef}
              closeAnnounceDialog={closeAnnounceDialog}
              message={message}
              sendAnnouncement={sendAnnouncement}
              setMessage={setMessage}
            />
            <UploadDialog
              uploadDialogRef={uploadDialogRef}
              today={today}
              getInputProps={getInputProps}
              getRootProps={getRootProps}
              isDragActive={isDragActive}
              handleUploadMaterial={handleUploadMaterial}
              preview={preview}
              hasFile={hasFile}
              removeFiles={removeFiles}
              closeUploadDialog={closeUploadDialog}
              setDateTime={setDateTime}
              setFileSection={setFileSection}
              setUploadMessage={setUploadMessage}
            />
          </>
        )}
      </div>
      <div className="home-feed-material">
        {course.courseMaterial.length > 0 ? (
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
                    <p className="">{`${time(material.deliverTime)}`}</p>
                  </section>
                  <section className="material-card-buttons">
                    {material.fileSection === "Announcement" ? (
                      <></>
                    ) : (
                      <button
                        onMouseEnter={() => {
                          setFileName(material.fileName);
                          setFilePath(material.filePath);
                          setFileType(material.fileType);
                        }}
                        onClick={() => {
                          loadFile();
                        }}
                        className="material-card-button"
                      >
                        <img
                          src={isDark ? DownloadW : DownloadB}
                          alt="Download"
                        />
                      </button>
                    )}
                    <button className="material-card-button">
                      <img
                        src={isDark ? CommentsW : CommentsB}
                        alt="Comments"
                      />
                    </button>
                  </section>
                </section>
              </div>
            );
          })
        ) : (
          <div className="empty">
            <img height={300} width={300} src={NoFiles} alt="" />
            <h1>This Course Has No Material Yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
