import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import PostsList from "../components/PostsList";
import {NavBar} from "../components/NavBar";
// import { Link } from "react-router-dom";

const DashboardPage = () => (
  <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform="dashboard-page:visit"
        yes={() => (
          <div>
            <NavBar />
            <br></br>

            <h2>Welcome back</h2>
            {/* <Link to={"/profile"}><button> Profile </button></Link>
            <Link to={"/ideas"}><button> Idea </button></Link> */}
            <Logout />
            <br />
            <Profile />
            <PostsList />
          </div>
        )}
        no={() => <Redirect to="/" />}
      />
    )}
  </AuthConsumer>
);

export default DashboardPage;