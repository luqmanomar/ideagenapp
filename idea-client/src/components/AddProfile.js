import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";
import {AuthConsumer} from "../authContext";

export default class AddProfile extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.newProfile = this.newProfile.bind(this);

    this.state = {
      id: "",
      email: "",
      role: "", 

      submitted: false
    };
  }

  onChangeId(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  saveProfile() {
    var data = {
      id: this.state.id,
      email: this.state.email
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          email: response.data.email,
          role: response.data.role,
        //  status: response.data.NEW,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProfile() {
    this.setState({
      id: "",
      email: "",
      role: "",

      submitted: false
    });
  }

  render() {
    return (
      <AuthConsumer>
      {({user}) => (
      <React.Fragment><NavBar /><br></br>
        <div className="submit-form">
        <h4>Create Profile</h4>
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProfile}>
                Create profile
              </button>
              <Link to={"/profile"}><button className="btn btn-warning">
                View Profile
              </button></Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="id">UserID</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  required
                  value={this.state.id}
                  onChange={this.onChangeTitle}
                  name="id"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  required
                  value={this.state.role}
                  onChange={this.onChangeRole}
                  name="role"
                />
              </div>
  
              <button onClick={this.saveProfile} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div></React.Fragment>    
        )}
        </AuthConsumer>
      );
    
  }
}