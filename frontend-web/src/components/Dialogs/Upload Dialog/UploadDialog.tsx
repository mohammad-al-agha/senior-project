import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import "../Dialogs.css";

type UploadDialogProps = {
  uploadDialogRef: React.RefObject<HTMLDialogElement>;
  today: string;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  preview: string | ArrayBuffer | null | undefined;
  removeFiles: () => void;
  hasFile: boolean;
  handleUploadMaterial: () => void;
  closeUploadDialog: () => void;
  setDateTime: React.Dispatch<React.SetStateAction<string>>;
  setFileSection: React.Dispatch<React.SetStateAction<string>>;
  setUploadMessage: React.Dispatch<React.SetStateAction<string>>;
};

const UploadDialog = ({
  uploadDialogRef,
  getInputProps,
  getRootProps,
  handleUploadMaterial,
  hasFile,
  isDragActive,
  preview,
  removeFiles,
  today,
  closeUploadDialog,
  setDateTime,
  setFileSection,
  setUploadMessage,
}: UploadDialogProps) => {
  return (
    <dialog className="dialog dialog--upload" ref={uploadDialogRef}>
      <h2>Upload</h2>
      <div className="dialog-options">
        <div className="dialog-left-section">
          <div className="dialog-section">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              placeholder={"Type your announcement here..."}
              className="upload-announcement"
              onChange={(e) => {
                setUploadMessage(e.target.value);
              }}
            ></textarea>
            <label htmlFor="types">File Type:</label>
            <select
              name="types"
              className="dropdown-menu"
              onChange={(e) => setFileSection(e.target.value)}
            >
              <option value={"Quiz"}>Quiz</option>
              <option value={"Assignment"}>Assignment</option>
              <option value={"Exam"}>Exam</option>
              <option value={"Exam"}>Extra Examples</option>
              <option value={"Exam"}>Corrected Samples</option>
            </select>
          </div>
          <div className="dialog-section">
            <label htmlFor="dateTime">Due Date:</label>
            <input
              type="datetime-local"
              name="dateTime"
              min={today}
              defaultValue={today}
              onChange={(e) => setDateTime(e.target.value)}
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
              onClick={
                hasFile
                  ? () => {
                      handleUploadMaterial();
                      setUploadMessage("");
                      closeUploadDialog();
                    }
                  : () => {}
              }
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
  );
};

export default UploadDialog;
