import React, { Component } from "react";
import {AuthConsumer} from "../authContext";
import UserDataService from "../services/user.service";
import { NavBar } from "./NavBar";

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: "",
        name: "",
        email: "",
        position: "",
        department: "",
        company: "",
      },
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  onChangeDepartment(e) {
    const department = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        department: department
      }
    }));
  }

  onChangePosition(e) {
    const position = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        position: position
      }
    }));
  }

  onChangeCompany(e) {
    const company = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        company: company
      }
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The profile was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <AuthConsumer>
      {({user}) => (
      <React.Fragment><NavBar /><br></br>
      <div>
          <div className="edit-form">
            <h4>Update profile</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentUser.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  value={currentUser.position}
                  onChange={this.onChangePosition}
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={currentUser.department}
                  onChange={this.onChangeDepartment}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  value={currentUser.company}
                  onChange={this.onChangeCompany}
                />
              </div>

              </form>
            <button type="submit" className="badge badge-success" onClick={this.updateUser}> Update Profile </button>
            <button className="badge badge-danger mr-2" onClick={this.deleteUser}> Delete Profile </button>

            
            {/* <p>{this.state.message}</p> */}
          </div>
      </div>
      </React.Fragment>)}
      </AuthConsumer>
    );
  }
}