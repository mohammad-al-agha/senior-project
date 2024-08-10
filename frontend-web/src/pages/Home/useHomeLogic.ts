import axios from "axios";
import { useEffect } from "react";
import { setCourses } from "../../redux/courses";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useHomeLogic = () => {
  const user = useSelector((state: RootState) => state.user.userType);

  const userType = localStorage.getItem("userType");

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const getCourses = {
    method: "get",
    url: `http://localhost:8000/${user ? user : userType}/getCourses`,
    headers: {
      Authorization: "bearer " + token,
    },
  };

  useEffect(() => {
    axios.request(getCourses).then((res) => {
      dispatch(setCourses(res.data));
    });
  }, []);

  const location = useLocation();

  return { location };
};
