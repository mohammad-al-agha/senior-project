import SideBar from "./Home Components/Side Bar/SideBar";

import "./HomePage.css";
import { Outlet } from "react-router-dom";
import CourseCardWrapper from "./Home Components/Course Cards/CourseCardWrapper";
import { useHomeLogic } from "./useHomeLogic";
import { ThemeType } from "../../core/types/themeTypes";

const Home = () => {
  const { location, isDark } = useHomeLogic();

  return (
    <div
      dark-theme={isDark === ThemeType.dark ? "dark" : "light"}
      className="home-page"
    >
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
