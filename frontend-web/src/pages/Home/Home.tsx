import axios from "axios";
import SideBar from "./Home Components/Side Bar/SideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCourses } from "../../redux/courses";
import "./HomePage.css";
import { Outlet, useLocation } from "react-router-dom";
import CourseCardWrapper from "./Home Components/Course Cards/CourseCardWrapper";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.userType);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const location = useLocation();

  const getCourses = {
    method: "get",
    url: `http://localhost:8000/${user}/getCourses`,
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: "bearer " + token,
    },
  };

  useEffect(() => {
    axios.request(getCourses).then((res) => {
      dispatch(setCourses(res.data));
    });
  }, []);

  return (
    <div className="home-page">
      <SideBar />
      {location.pathname.includes("/course/") ? (
        <Outlet />
      ) : (
        <CourseCardWrapper />
      )}
    </div>
  );
};

export default Home;
