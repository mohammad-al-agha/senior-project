import React from "react";
import "./UserTypes.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setAsInstructor, setAsStudent } from "../../../../redux/userType";

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
  const user = useSelector((state: RootState) => state.user.userType);
  const dispatch = useDispatch();

  const handleClick = (value: string) => {
    value === "student"
      ? dispatch(
          setAsStudent({
            userType: "student",
            userEmail: "",
            userName: "",
          })
        )
      : dispatch(
          setAsInstructor({
            userType: "instructor",
            userEmail: "",
            userName: "",
          })
        );
  };

  return (
    <div
      className={`type-checkbox ${user === value ? "checked" : null}`}
      onClick={() => handleClick(value)}
      key={value}
    >
      <input
        type="radio"
        value={value}
        checked={user === value}
        onChange={() => handleClick(value)}
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
