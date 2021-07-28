import React from "react";

import {AuthConsumer} from "../authContext";

const Profile = () => (
  <AuthConsumer>
    {({user}) => (
      <div>
        <h4>User Details</h4>
        <ul>
          <li>ID: {user.id}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
        </ul>
      </div>
    )}
  </AuthConsumer>
);

export default Profile;