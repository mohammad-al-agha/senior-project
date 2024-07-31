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
import UserType from "./login-components/UserType";
import Student from "../../../../assets/images/Student.svg";
import Instructor from "../../../../assets/images/Instructor.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ThemeType } from "../../../core/types/themeTypes";

const Login = () => {
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);

  return (
    <div className="login-body">
      <div className="login-body--left">
        <section className="login-icon login-icon--board">
          <img src={Board} height={65} width={155} alt="" />
        </section>
        <section className="login-icon login-icon--atom">
          <img src={Atom} height={65} width={155} alt="" />
        </section>
        <section className="login-icon login-icon--brain">
          <img src={Brain} height={65} width={155} alt="" />
        </section>
        <section className="login-icon login-icon--molecule">
          <img src={Molecule} height={65} width={155} alt="" />
        </section>
        <section className="login-icon login-icon--rocket">
          <img src={Rocket} height={65} width={155} alt="" />
        </section>
        <section className="login-icon login-icon--bulb">
          <img src={Bulb} height={65} width={155} alt="" />
        </section>
        <h1>Welcome To Synergy !</h1>
        <img src={Hero} height={500} width={800} alt="" />
      </div>
      <div className="login-body--right">
        <img
          src={isDark === ThemeType.light ? LogoBright : LogoDark}
          height={125}
          width={225}
          alt=""
        />
        {/* <div className="input-section--checkbox">
          <label htmlFor="userType">Student</label>
          <input type="checkbox" id="userType" />
        </div>
        <div className="input-section--checkbox">
          <label htmlFor="userType">Instructor</label>
          <input type="checkbox" id="userType" />
        </div> */}
        <div className="user-types">
          <UserType icon={Student} type="Student" value="Std" />
          <UserType icon={Instructor} type="Instructor" value="Inst" />
        </div>
        <div className="input-section--text">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input-section--text">
          <label htmlFor="Pass">Password</label>
          <input
            type="password"
            id="Pass"
            name="Pass"
            placeholder="Type your password"
          />
        </div>
        <button className="green--button">Login</button>
      </div>
    </div>
  );
};

export default Login;
