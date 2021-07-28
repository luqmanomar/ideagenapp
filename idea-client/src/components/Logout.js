import React from "react";

import { AuthConsumer } from "../authContext";

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => (
      <button className="badge badge-danger" onClick={logout}>
        Logout
      </button>
    )}
  </AuthConsumer>
);

export default Logout;