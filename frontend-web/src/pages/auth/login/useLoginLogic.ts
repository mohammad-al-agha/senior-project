import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAsInstructor, setAsStudent } from "../../../redux/userType";
import { RootState } from "../../../redux/store";

export const useLoginLogic = () => {
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);
  const user = useSelector((state: RootState) => state.user.userType);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);

  const login = () => {
    axios
      .post(`http://localhost:8000/auth/${user}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        user === "student"
          ? (dispatch(
              setAsStudent({
                email: response.data.email,
                name: response.data.name,
              })
            ),
            localStorage.setItem("userType", "student"),
            localStorage.setItem("email", `${response.data.email}`),
            localStorage.setItem("name", `${response.data.name}`))
          : (dispatch(
              setAsInstructor({
                email: response.data.email,
                name: response.data.name,
              })
            ),
            localStorage.setItem("userType", "instructor"),
            localStorage.setItem("email", `${response.data.email}`),
            localStorage.setItem("name", `${response.data.name}`));
        navigate("/home", { replace: true });
      })
      .catch((e) => console.log(e));
  };

  return {
    email,
    onEmailChange,
    password,
    onPasswordChange,
    visibility,
    setVisibility,
    login,
    isDark,
  };
};
