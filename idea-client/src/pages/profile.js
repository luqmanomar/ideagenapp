import React from 'react';
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";
import IdeasListUser from '../components/IdeaListUser';
import Logout from "../components/Logout";
import { NavBar } from '../components/NavBar';
// import { Link } from "react-router-dom";
  
const ProfilePage = () => {

return (
    <AuthConsumer>
        {({user}) => (
            <Can
                role={user.role}
                perform="dashboard-page:visit"
                yes={() => (
                    <React.Fragment>
                        <NavBar /><br></br>
                        <h3>Profile</h3>
                        {/* <Link to={"/updateprofile"}><button className="badge badge-warning"> Update Profile </button></Link>
                        <Link to={"/login"}><button className="badge badge-danger"> Log Out </button></Link> */}
                        <br></br>

                        <Logout />

                        <div className= "column left"> 
                            <br></br>
                            <h5>Name  </h5>  
                            <h6>Position, Company</h6>
                            <br></br>
                            <p>ID   : {user.id}</p>
                            <p>Email   : {user.email}</p>
                            <p>Role : {user.role}</p>                
                            <p>Idea Contributed: </p>
                            <p>Points: </p>
                        </div>
                    
                        <div className= "column right">
                            <IdeasListUser />
                        </div>
                    </React.Fragment>
                )}
                no={() => <Redirect to="/" />}
            />
        )}
    </AuthConsumer>
    )
}

export default ProfilePage;
