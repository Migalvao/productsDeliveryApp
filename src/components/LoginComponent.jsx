import { useState } from "react";
import axios from "axios";

const LoginComponent = (props) => {
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

    const loginFormData = new FormData();
    loginFormData.append("username", props.info.username);
    loginFormData.append("password", props.info.password);

    axios
      .post("/login", loginFormData)
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
          />{" "}
        </label>{" "}
        <label style={{ display: "block" }}>
          Password:
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
          />{" "}
        </label>{" "}
        <input type="submit" value="Submit" />
      </form>
      <br />
      <p>{error || null}</p>
    </div>
  );
};

export default LoginComponent;
