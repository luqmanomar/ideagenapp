import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";
// import Logout from "../components/Logout";
// import Profile from "../components/Profile";
import EventsList from "../components/EventsList";
import {NavBar} from "../components/NavBar";
import IdeasList from "../components/IdeasList";
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
            <p>{user.email}</p>
            {/* <Link to={"/profile"}><button> Profile </button></Link>
            <Link to={"/ideas"}><button> Idea </button></Link> */}
            {/* <Logout /> */}
            {/* <Link to={"/addprofile"}><button className="badge badge-success"> + Create profile </button></Link> */}

            <br />
            {/* <Profile /> */}
            <EventsList />
            <IdeasList />
          </div>
        )}
        no={() => <Redirect to="/" />}
      />
    )}
  </AuthConsumer>
);

export default DashboardPage;