import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAsInstructor, setAsStudent } from "../../../redux/userType";
import { RootState } from "../../../redux/store";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const useLoginLogic = () => {
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);
  const user = useSelector((state: RootState) => state.user.userType);

  const [error, setError] = useState("");

  const schema = yup.object({
    email: yup
      .string()
      .email("Not a Valid Email")
      .required("Email is Required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8)
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password should contains at least 1 Lowercase"
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password should contains at least 1 Uppercase"
      )
      .matches(
        RegExp("(.*\\d.*)"),
        "Password should contains at least 1 Number"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);

  const login = (data: any) => {
    if (user == null) {
      setError("Please select your user type");
      return;
    }
    axios
      .post(`http://localhost:8000/auth/${user}/login`, data)
      .then((response) => {
        console.log(response.status);
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
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };

  return {
    visibility,
    setVisibility,
    login,
    isDark,
    register,
    handleSubmit,
    errors,
    error,
  };
};
