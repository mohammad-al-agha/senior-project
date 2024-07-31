import React, { useState } from "react";
import "./UserTypes.css";

type UserTypeProps = {
  icon: string;
  type: string;
  value: string;
};

const UserType: React.FC<UserTypeProps> = ({
  icon,
  type,
  value,
}: UserTypeProps) => {
  const [selectedType, setSelectedType] = useState("");

  const handleClick = () => {
    setSelectedType((prev) => (prev === "" ? value : ""));
  };

  return (
    <div
      className={`type-checkbox ${selectedType === value ? "checked" : ""}`}
      onClick={handleClick}
    >
      <input
        type="radio"
        value={value}
        checked={selectedType === value}
        onChange={handleClick}
        name="user-type"
        hidden
      />
      <div className="img-cover">
        <img src={icon} alt="" />
      </div>
      <h4>{type}</h4>
    </div>
  );
};

export default UserType;
