import SideBar from "./Home Components/Side Bar/SideBar";

import "./HomePage.css";
import { Outlet } from "react-router-dom";
import CourseCardWrapper from "./Home Components/Course Cards/CourseCardWrapper";
import { useHomeLogic } from "./useHomeLogic";

const Home = () => {
  const { location } = useHomeLogic();

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
