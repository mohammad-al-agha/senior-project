import React from "react";
import "./SideBarButton.css";
import { NavLink } from "react-router-dom";

type SideBarOptionButtonProps = {
  icon: string;
  option: string;
  toHome?: boolean;
};

const SideBarOptionButton: React.FC<SideBarOptionButtonProps> = ({
  icon,
  option,
  toHome,
}: SideBarOptionButtonProps) => {
  return (
    <NavLink to={toHome ? `/home` : `/home/${option}`} className="side-bar-btn">
      <img src={icon} alt="" />
      <h4>{option}</h4>
    </NavLink>
  );
};

export default SideBarOptionButton;
