import React from "react";
import "./SideBarButton.css";
import { NavLink } from "react-router-dom";

type SideBarOptionButtonProps = {
  icon: string;
  option: string;
};

const SideBarOptionButton: React.FC<SideBarOptionButtonProps> = ({
  icon,
  option,
}: SideBarOptionButtonProps) => {
  return (
    <NavLink to={`/home/${option}`} className="side-bar-btn">
      <img src={icon} alt="" />
      <h4>{option}</h4>
    </NavLink>
  );
};

export default SideBarOptionButton;
