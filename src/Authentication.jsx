import "./css/App.css";
import { useState } from "react";
import LoginComponent from "./components/LoginComponent";
import SignupComponent from "./components/SignupComponent";

const Authentication = () => {
  const [loginState, setLoginState] = useState(true);
  const [loginInfo, setLoginInfo] = useState({});
  const [signInInfo, setSignInInfo] = useState({});

  return (
    <div className="App">
      <h1> UCeta </h1>
      <div>
        <button
          onClick={() => {
            setLoginState(true);
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            setLoginState(false);
          }}
        >
          Signup
        </button>
        {loginState ? (
          <LoginComponent
            info={loginInfo}
            onChange={setLoginInfo}
          ></LoginComponent>
        ) : (
          <SignupComponent
            info={signInInfo}
            onChange={setSignInInfo}
          ></SignupComponent>
        )}
      </div>
    </div>
  );
};

export default Authentication;
