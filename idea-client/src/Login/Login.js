import React, { useState, 
  // useContext,
 } from "react";
// import { UserContext } from "../UserContext";

import styles from "./Login.css";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserDataService from "../services/user.service";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();

  // set User
  // const { user, setUser } = useContext(UserContext);
  // const { login } = useContext(UserContext);
  // const [username, setUsername] = useState();
  // const [id, setUserId] = useState();

  // const updateUsername = (e) => {
  //   setUsername(e);
  // }
  // const updateUserId = (e) => {
  //   setUserId(e);
  // }

  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
    UserDataService.signIn(data)
      // .then((res) => res.json())
      .then(({ error, data }) => {
        setMessage({
          data: error || "Logged in successfully, redirecting...",
          type: error ? "alert-danger" : "alert-success",
        });
        
        // updateUsername(data.username);
        // updateUserId(data.id);
        const user =  {
          id: data.id,
          username: data.username,
          auth:true
        };

        //setUser(user);


        // !error &&
        //   setTimeout(() => {
        //     localStorage.setItem("token", data.token);
        //     history.push("/home");
        //   }, 3000);
        //!error && e.target.reset();


      });
  };

  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.loginFormContainer}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
          >
            Login Form
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForUsername">Username</label>
              <span className="mandatory">*</span>
              <input
                id="inputForUsername"
                name="username"
                type="username"
                className="form-control"
                aria-describedby="Enter username"
                placeholder="Enter username"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your username",
                  },
                })}
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors.username && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>

              <button className="btn btn-link ml-auto">
                <Link to="/register">Register Now!</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
