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
  const user = useSelector((state: RootState) => state.user.userType);
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);

  const { courseId } = useParams();

  const [message, setMessage] = useState("");

  const [hasFile, setHasFile] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();

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

  const getCourse = {
    method: "GET",
    url: `http://localhost:8000/course/getCourse?courseId=${courseId}`,
  };

  useEffect(() => {}, [course.courseMaterial]);

  useEffect(() => {
    axios
      .request(getCourse)
      .then((res) => {
        dispatch(setCurrentCourse(res.data));
        course.courseMaterial.reverse();
        console.log(course.courseMaterial);
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

  const handleUploadMaterial = () => {
    if (typeof acceptedFiles[0] === undefined) return;

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const uploadMaterial = {
      method: "POST",
      url: "http://localhost:8000/uploads/uploadMaterial",
      data: formData,
    };

    axios
      .request(uploadMaterial)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

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
  };
};
