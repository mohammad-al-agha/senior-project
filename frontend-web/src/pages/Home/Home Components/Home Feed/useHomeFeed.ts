import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { setCurrentCourse } from "../../../../redux/course";
import axios from "axios";

export const useHomeFeedLogic = () => {
  const course = useSelector((state: RootState) => state.selectedCourse.course);

  const { courseId } = useParams();
  const dispatch = useDispatch();

  const getCourse = {
    method: "GET",
    url: `http://localhost:8000/course/getCourse?courseId=${courseId}`,
  };

  useEffect(() => {
    axios
      .request(getCourse)
      .then((res) => {
        dispatch(setCurrentCourse(res.data));
        console.log(course);
      })
      .catch((e) => console.log(e));
  }, []);

  const user = useSelector((state: RootState) => state.user.userType);

  const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log(target.files);
    target.files.length < 1 ? setHasFile(false) : setHasFile(true);
    setFile(target.files[0]);
  };

  const handleUploadMaterial = () => {
    console.log("Button clicked");

    if (file === undefined) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

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

  return {
    handleFileUpload,
    handleUploadMaterial,
    user,
    course,
    hasFile,
    setHasFile,
  };
};
