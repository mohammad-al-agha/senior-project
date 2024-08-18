import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTime } from "../../../../hooks/useTime";
import { useDate } from "../../../../hooks/useDate";
import { useFileIcon } from "../../../../hooks/useFileIcon";
import { useDropzone } from "react-dropzone";
import { RootState } from "../../../../redux/store";
import { setCurrentCourse, setMaterial } from "../../../../redux/course";
import axios from "axios";
import { useBackgroundIcon } from "../../../../hooks/useBackgroundIcon";

export const useHomeFeedLogic = () => {
  const course = useSelector((state: RootState) => state.selectedCourse.course);
  let user = useSelector((state: RootState) => state.user.userType);
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);

  if (!user) {
    const type = localStorage.getItem("userType");

    type === "instructor" ? (user = "instructor") : (user = "student");
  }

  const { courseId } = useParams();

  const [message, setMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const [hasFile, setHasFile] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();

  const [dateTime, setDateTime] = useState<string>("");
  const [fileSection, setFileSection] = useState("Quiz");

  const dispatch = useDispatch();

  const uploadDialogRef = useRef<HTMLDialogElement>(null);
  const announceDialogRef = useRef<HTMLDialogElement>(null);

  const icon = useBackgroundIcon(course.icon, isDark);

  const token = localStorage.getItem("token");

  const announce = {
    method: "POST",
    url: `http://localhost:8000/instructor/sendAnnouncement`,
    data: { courseId: courseId, message: message },
    headers: { Authorization: `Bearer ${token}` },
  };

  const sendAnnouncement = () => {
    axios.request(announce).then((res) => {
      dispatch(setMaterial(res.data));
    });
  };

  //get course

  const getCourse = {
    method: "GET",
    url: `http://localhost:8000/course/getCourse?courseId=${courseId}`,
  };

  useEffect(() => {}, [course.courseMaterial]);

  useEffect(() => {
    axios
      .request(getCourse)
      .then((res) => {
        console.log(res.data);

        dispatch(setCurrentCourse(res.data));
      })
      .catch((e) => console.log(e));
  }, [courseId]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = new FileReader();

    file.onload = () => {
      acceptedFiles.forEach((f: File) => {
        setPreview((prev) => (prev ? prev + " / " + f.name : f.name));
      });
    };

    setHasFile(true);

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const removeFiles = () => {
    acceptedFiles.length = 0;
    setPreview(null);
    setHasFile(false);
  };

  //handle upload

  const handleUploadMaterial = () => {
    if (typeof acceptedFiles[0] === undefined) return;

    const formData = new FormData();

    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    const uploadMaterial = {
      method: "POST",
      url: `http://localhost:8000/uploads/uploadMaterial?courseId=${course._id}&fileSection=${fileSection}&dueTime=${dateTime}&description=${uploadMessage}`,
      data: formData,
    };

    axios
      .request(uploadMaterial)
      .then((res) => dispatch(setMaterial(res.data)))
      .catch((e) => console.log(e));
  };

  //load file
  const [fileName, setFileName] = useState<string | null>();
  const [filePath, setFilePath] = useState<string | null>();
  const [fileType, setFileType] = useState<string | null>();

  const loadFile = async () => {
    const data = {
      fileName: fileName,
      filePath: filePath,
      fileType: fileType,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/course/downloadFile",
        data,
        {
          responseType: "blob",
        }
      );

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName!;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  //dialog functions

  const openUploadDialog = () => {
    if (uploadDialogRef.current) {
      uploadDialogRef.current.showModal();
    }
  };
  const openAnnounceDialog = () => {
    if (announceDialogRef.current) {
      announceDialogRef.current.showModal();
    }
  };

  const closeUploadDialog = () => {
    if (uploadDialogRef.current) {
      uploadDialogRef.current.close();
    }
  };
  const closeAnnounceDialog = () => {
    if (announceDialogRef.current) {
      announceDialogRef.current.close();
    }
  };

  const openCalendly = () => {
    const url = "https://calendly.com/mohammad-alagha";
    window.open(url, "_blank");
  };

  const getIcon = useFileIcon;
  const time = useTime;
  const date = useDate;

  const today = new Date().toISOString().split("T")[0];

  return {
    handleUploadMaterial,
    user,
    course,
    hasFile,
    isDragActive,
    getRootProps,
    getInputProps,
    preview,
    removeFiles,
    openUploadDialog,
    closeUploadDialog,
    uploadDialogRef,
    openAnnounceDialog,
    closeAnnounceDialog,
    announceDialogRef,
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
  };
};
