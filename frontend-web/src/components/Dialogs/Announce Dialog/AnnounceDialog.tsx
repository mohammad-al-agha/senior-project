import "../Dialogs.css";

type AnnounceDialogProps = {
  announceDialogRef: React.RefObject<HTMLDialogElement>;
  message: string;
  setMessage: (value: React.SetStateAction<string>) => void;
  sendAnnouncement: () => void;
  closeAnnounceDialog: () => void;
};

const AnnounceDialog = ({
  announceDialogRef,
  closeAnnounceDialog,
  message,
  sendAnnouncement,
  setMessage,
}: AnnounceDialogProps) => {
  return (
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
            className={message === "" ? "disabled--button" : "green--button"}
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
  );
};

export default AnnounceDialog;
