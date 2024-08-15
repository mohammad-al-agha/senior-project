import { useSelector } from "react-redux";
import { Course } from "../../../../redux/courses/coursesSlice";
import { RootState } from "../../../../redux/store";
import SideBarButton from "./Side Bar Components/SideBarButton";
import "./SideBar.css";
import SideBarOptionButton from "./Side Bar Components/SideBarOptionButton";
import Door from "../../../../../assets/images/Door.svg";
import Gear from "../../../../../assets/images/Gear.svg";
import Home from "../../../../../assets/images/Home.svg";
import SImage from "../../../../../assets/images/Student.svg";
import IIMage from "../../../../../assets/images/Instructor.svg";
import { ThemeType } from "../../../../core/types/themeTypes";

const SideBar = () => {
  const courses = useSelector((state: RootState) => state.course.courses);
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);
  const userName = localStorage.getItem("name");
  const user = useSelector((state: RootState) => state.user);

  return (
    <div
      className={`side-bar ${
        isDark === ThemeType.dark ? "side-bar--dark" : "side-bar--light"
      }`}
    >
      <div className="side-bar-upper">
        <img
          className="side-bar-img"
          src={
            user.imgUrl
              ? user.imgUrl
              : user.userType === "student"
              ? SImage
              : IIMage
          }
          alt="student photo"
        />
        <h3>{user.userName ? user.userName : userName}</h3>
      </div>

      <SideBarOptionButton icon={Home} option="Home" toHome={true} />
      <div className="side-bar-classes">
        {courses.map((course: Course) => {
          return <SideBarButton key={course._id} course={course} />;
        })}
      </div>
      <div className="side-bar-button-wrapper">
        <SideBarOptionButton icon={Gear} option="Settings" />
        <SideBarOptionButton icon={Door} option="Logout" />
      </div>
    </div>
  );
};

export default SideBar;
