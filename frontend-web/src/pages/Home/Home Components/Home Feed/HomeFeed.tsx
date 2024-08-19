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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterCourse, resetFilter } from "../../../../redux/course";

const HomeFeed = () => {
  const {
    handleUploadMaterial,
    user,
    course,
    filteredCourses,
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
    openCalendly,
  } = useHomeFeedLogic();

  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const dispatch = useDispatch();

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
            <button onClick={openCalendly} className="green--button">
              Request a Meeting
            </button>
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
        <div className="filters">
          <div
            onClick={() => {
              dispatch(resetFilter());
              handleFilterClick("All");
            }}
            className={`filter-button ${
              selectedFilter == "All" ? "filter-selected" : ""
            }`}
          >
            All
          </div>
          <div
            onClick={() => {
              dispatch(filterCourse("Assignment"));
              handleFilterClick("Assignment");
            }}
            className={`filter-button ${
              selectedFilter == "Assignment" ? "filter-selected" : ""
            }`}
          >
            Assignments
          </div>
          <div
            onClick={() => {
              dispatch(filterCourse("Announcement"));
              handleFilterClick("Announcement");
            }}
            className={`filter-button ${
              selectedFilter == "Announcement" ? "filter-selected" : ""
            }`}
          >
            Announcements
          </div>
          <div
            onClick={() => {
              dispatch(filterCourse("Quiz"));
              handleFilterClick("Quiz");
            }}
            className={`filter-button ${
              selectedFilter == "Quiz" ? "filter-selected" : ""
            }`}
          >
            Quizzes
          </div>
          <div
            onClick={() => {
              dispatch(filterCourse("Exam"));
              handleFilterClick("Exam");
            }}
            className={`filter-button ${
              selectedFilter == "Exam" ? "filter-selected" : ""
            }`}
          >
            Exams
          </div>
          <div
            onClick={() => {
              dispatch(filterCourse("Extra"));
              handleFilterClick("Extra");
            }}
            className={`filter-button ${
              selectedFilter == "Extra" ? "filter-selected" : ""
            }`}
          >
            Extra Examples
          </div>
          <div
            onClick={() => {
              dispatch(filterCourse(""));
              handleFilterClick("Corrected");
            }}
            className={`filter-button ${
              selectedFilter == "Corrected" ? "filter-selected" : ""
            }`}
          >
            Corrected Samples
          </div>
        </div>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((material) => {
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
            <h1>There Are No Materials Yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
