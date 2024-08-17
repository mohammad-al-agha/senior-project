import React from "react";
import "./SideBarButton.css";
import { NavLink, useNavigate } from "react-router-dom";

type SideBarOptionButtonProps = {
  icon: string;
  title: string;
  to: string;
};

const SideBarOptionButton: React.FC<SideBarOptionButtonProps> = ({
  icon,
  title,
  to,
}: SideBarOptionButtonProps) => {
  const navigate = useNavigate();

  return (
    <NavLink
      to={to}
      className="side-bar-btn"
      onClick={
        to === "/"
          ? () => {
              localStorage.clear();
              navigate("/", { replace: true });
              window.history.pushState(null, "", "/");
            }
          : () => {}
      }
    >
      <img src={icon} alt="" />
      <h4>{title}</h4>
    </NavLink>
  );
};

export default SideBarOptionButton;
