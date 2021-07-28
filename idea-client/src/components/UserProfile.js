import React, { Component } from "react";

import UserDataService from "../services/user.service";
import {AuthConsumer} from "../authContext";
import Can from "./Can";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.retrieveUser = this.retrieveUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.state = {
            name: "",
            email: "",
            role: "",
            position: "",
            department: "",
            company: "",
            points: null,
            // id:"",
            // user: [],
            // currentUser: null,
          //   currentIndex: -1,
          //   searchTitle: ""
          };
        }
  
        componentDidMount() {
          this.retrieveUser();
        }
  
        retrieveUser() {
          const id = AuthConsumer.user.id;
          UserDataService.get(id)
            .then(response => {
              this.setState({
                user: response.data,
                currentUser: response.data
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
  
        onChangePosition(e) {
          const position = e.target.value;
      
          this.setState(function(prevState) {
            return {
              currentUser: {
                ...prevState.currentUser,
                position: position
              }
            };
          });
        }
  
        onChangeDepartment(e) {
          const department = e.target.value;
          
          this.setState(prevState => ({
            currentDepartment: {
              ...prevState.currentUser,
              department: department
            }
          }));
        }
  
        // getIdea(id) {
        //   IdeaDataService.get(id)
        //     .then(response => {
        //       this.setState({
        //         currentIdea: response.data
        //       });
        //       console.log(response.data);
        //     })
        //     .catch(e => {
        //       console.log(e);
        //     });
        // }
      
        updateUser() {
          UserDataService.update(
            this.state.currentUser.id,
            this.state.currentUser
          )
            .then(response => {
              console.log(response.data);
              this.setState({
                message: "The idea was updated successfully!"
              });
            })
            .catch(e => {
              console.log(e);
            });
        }
      
        // deleteIdea() {    
        //   IdeaDataService.delete(this.state.currentIdea.id)
        //     .then(response => {
        //       console.log(response.data);
        //       this.props.history.push('/ideas')
        //     })
        //     .catch(e => {
        //       console.log(e);
        //     });
        // }
  
        render() {
          const { profile } = this.state;
  
          return (
          <AuthConsumer>
              {({user}) => (
                <div>
                    <h2>User Profile</h2>
                    <ul>
                    <li>ID: {user.id}</li>
                    <li>Name: {profile.name}</li>
                    <li>Email: {profile.email}</li>
                    <li>Role: {profile.role}</li>
                    <li>Position: {profile.position}</li>
                    <li>Department: {profile.department}</li>
                    <li>Company: {profile.company}</li>
                    <li>Ideas Contributed: {profile.points}</li>
                    </ul>
                    <button className="btn btn-sm btn-default" href="/updateprofile"> 
                        Edit Profile
                    </button>
                </div>
                )}
          </AuthConsumer>
          )};}
  
  export default UserProfile;