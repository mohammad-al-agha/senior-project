import { useSelector } from "react-redux";
import { Course } from "../../../../redux/courses/coursesSlice";
import { RootState } from "../../../../redux/store";
import { useEffect } from "react";
import SideBarButton from "./Side Bar Components/SideBarButton";
import "./SideBar.css";
import SideBarOptionButton from "./Side Bar Components/SideBarOptionButton";
import Door from "../../../../../assets/images/Door.svg";
import Gear from "../../../../../assets/images/Gear.svg";

const SideBar = () => {
  const courses = useSelector((state: RootState) => state.course.courses);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {}, []);
  return (
    <div className="side-bar">
      <div className="side-bar-upper">
        {/* <img src="" alt="student photo" /> */}
        <h2>{user.userName}</h2>
      </div>
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
