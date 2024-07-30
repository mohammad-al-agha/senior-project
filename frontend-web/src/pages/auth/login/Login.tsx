import "./Login.css";

const Login = () => {
  return (
    <div className="login-body">
      <h1>Synergy</h1>
      <div className="login-wrapper">
        <h1>Welcome To Synergy!</h1>
        <div className="input-section">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input-section">
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
