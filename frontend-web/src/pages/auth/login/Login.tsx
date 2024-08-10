import "./Login.css";
import LogoBright from "../../../../assets/images/LogoBright.svg";
import LogoDark from "../../../../assets/images/LogoDark.svg";
import Board from "../../../../assets/images/Board.svg";
import Rocket from "../../../../assets/images/Rocket.svg";
import Bulb from "../../../../assets/images/Bulb.svg";
import Brain from "../../../../assets/images/Brain.svg";
import Atom from "../../../../assets/images/Atom.svg";
import Molecule from "../../../../assets/images/Molecule.svg";
import Hero from "../../../../assets/images/Hero.svg";
import Student from "../../../../assets/images/Student.svg";
import Instructor from "../../../../assets/images/Instructor.svg";
import VisibilityOn from "../../../../assets/images/VisibilityOn.svg";
import VisibilityOff from "../../../../assets/images/VisibilityOff.svg";
import UserType from "./login-components/UserTypeButton";
import { ThemeType } from "../../../core/types/themeTypes";
import { useLoginLogic } from "./useLoginLogic";

const Login = () => {
  const {
    email,
    onEmailChange,
    password,
    onPasswordChange,
    visibility,
    setVisibility,
    login,
    isDark,
  } = useLoginLogic();
  return (
    <div className="login-body">
      <div className="login-body--left">
        <section className="login-icon login-icon--board">
          <img src={Board} height={65} width={155} alt="Mortar Board" />
        </section>
        <section className="login-icon login-icon--atom">
          <img src={Atom} height={65} width={155} alt="Atom" />
        </section>
        <section className="login-icon login-icon--brain">
          <img src={Brain} height={65} width={155} alt="Brain" />
        </section>
        <section className="login-icon login-icon--molecule">
          <img src={Molecule} height={65} width={155} alt="Molecule" />
        </section>
        <section className="login-icon login-icon--rocket">
          <img src={Rocket} height={65} width={155} alt="Rocket" />
        </section>
        <section className="login-icon login-icon--bulb">
          <img src={Bulb} height={65} width={155} alt="Bulb" />
        </section>
        <h1>Welcome To Synergy !</h1>
        <img src={Hero} height={500} width={800} alt="Synergy Logo" />
      </div>
      <div className="login-body--right">
        <img
          src={isDark === ThemeType.light ? LogoBright : LogoDark}
          height={125}
          width={225}
          alt=""
        />
        <div className="user-types">
          <UserType icon={Student} type="Student" value="student" />
          <UserType icon={Instructor} type="Instructor" value="instructor" />
        </div>
        <div className="input-section-wrapper">
          <div className="input-section--text">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={email}
              placeholder="example@gmail.com"
              onChange={onEmailChange}
            />
          </div>
          <div className="input-section--text pass-input">
            <label htmlFor="Pass">Password</label>
            <input
              type={visibility ? "text" : "password"}
              id="Pass"
              name="Pass"
              value={password}
              placeholder="Type your password"
              onChange={onPasswordChange}
            />
            <span
              className="vis-icon"
              onClick={() => setVisibility(!visibility)}
            >
              <img src={visibility ? VisibilityOff : VisibilityOn} alt="" />
            </span>
          </div>
        </div>
        <button onClick={() => login()} className="green--button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
