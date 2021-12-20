import { useState } from "react";
import axios from "axios";

const SignupComponent = (props) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.onChange((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.info.password !== props.info.password2) {
      setError("Passwords must match!");
      return;
    }

    const signUpInfo = new FormData();
    signUpInfo.append("username", props.info.username);
    signUpInfo.append("name", props.info.username);
    signUpInfo.append("password", props.info.password);

    axios
      .post("/register", signUpInfo)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          // console.log(error.response.data.Error);
          setError(error.response.data.Error);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block" }}>
          Username:
          <input
            required
            type="text"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label style={{ display: "block" }}>
          Name:
          <input
            required
            type="text"
            name="name"
            onChange={handleChange}
          />
        </label>
        <label style={{ display: "block" }}>
          Password:
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <label style={{ display: "block" }}>
          Confirm password:
          <input
            required
            type="password"
            name="password2"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <br />
      <p>{error || null}</p>
    </div>
  );
};

export default SignupComponent;
