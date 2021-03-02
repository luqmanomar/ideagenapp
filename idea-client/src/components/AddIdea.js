import React, { Component } from "react";
import IdeaDataService from "../services/idea.service";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";
import {AuthConsumer} from "../authContext";

export default class AddIdea extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.saveIdea = this.saveIdea.bind(this);
    this.newIdea = this.newIdea.bind(this);

    this.state = {
      id: "",
      title: "",
      // description: "", 
      user: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  // onChangeDescription(e) {
  //   this.setState({
  //     description: e.target.value
  //   });
  // }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  saveIdea() {
    var data = {
      title: this.state.title,
      user: this.state.user
    };

    IdeaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
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

  newIdea() {
    this.setState({
      id: "",
      title: "",
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
        <h4>Add Idea</h4>
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newIdea}>
                Add
              </button>
              <Link to={"/ideas"}><button className="btn btn-warning">
                View Ideas
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
  
              <button onClick={this.saveIdea} className="btn btn-success">
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