import { useSelector } from "react-redux";
import "./App.css";
import "./index.css";
import Login from "./pages/auth/login/Login";
import { RootState } from "./redux/store";
import { ThemeType } from "./core/types/themeTypes";

function App() {
  const isDark = useSelector((state: RootState) => state.theme.currentTheme);

  return (
    <div dark-theme={isDark === ThemeType.dark ? "dark" : "light"}>
      <Login />
    </div>
  );
}

export default App;
