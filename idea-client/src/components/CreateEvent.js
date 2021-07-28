import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";
import {AuthConsumer} from "../authContext";

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);

    this.state = {
      id: "",
      title: "",
      description: "", 
      user: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  saveEvent() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      user: this.state.user
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          user: response.data.user,
        //  status: response.data.NEW,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEvent() {
    this.setState({
      id: "",
      title: "",
      description: "",
      user: "",

      submitted: false
    });
  }

  render() {
    return (
      <AuthConsumer>
      {({user}) => (
      <React.Fragment><NavBar /><br></br>
        <div className="submit-form">
        <h4>Create new event</h4>
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newEvent}>
                Create an event
              </button>
              <Link to={"/dashboard"}><button className="btn btn-warning">
                View Dashboard
              </button></Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="user">User</label>
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  required
                  value={user.id}
                  onChange={this.onChangeUser}
                  name="user"
                />
              </div>
  
              <button onClick={this.saveEvent} className="btn btn-success">
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