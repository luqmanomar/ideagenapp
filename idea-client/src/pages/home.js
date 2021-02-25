import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Login from "../components/Login";
// import PostsList from "../components/PostsList";

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>
          <h2>Welcome to Idea Generation Manager</h2>

          <p>Idea Generation Manager application aims to help an organization to gather ideas from the employees.</p>
          <p><a href="/login" >
            Start contributing idea
          </a></p>
          <Login />
          {/* <Link to={"/add"}><button className="badge badge-success"> + Submit new Idea </button></Link> */}
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;