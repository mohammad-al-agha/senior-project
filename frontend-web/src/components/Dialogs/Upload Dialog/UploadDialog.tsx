import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

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
}: UploadDialogProps) => {
  return (
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
  );
};

export default UploadDialog;
