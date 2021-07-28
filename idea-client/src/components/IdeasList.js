import React, { Component } from "react";

import IdeaDataService from "../services/idea.service";
import {AuthConsumer} from "../authContext";
import Can from "./Can";
import { Link } from "react-router-dom";

class IdeasList extends Component {

    constructor(props) {
        super(props);
        this.retrieveIdeas = this.retrieveIdeas.bind(this);
        this.updateIdea = this.updateIdea.bind(this);
        this.deleteIdea = this.deleteIdea.bind(this);   
    
        this.state = {
          ideas: [],
          currentIdea: null,
        //   currentIndex: -1,
        //   searchTitle: ""
        };
      }

      componentDidMount() {
        this.retrieveIdeas();
      }

      retrieveIdeas() {
        IdeaDataService.getAll()
          .then(response => {
            this.setState({
              ideas: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentIdea: {
              ...prevState.currentIdea,
              title: title
            }
          };
        });
      }

      onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
          currentIdea: {
            ...prevState.currentIdea,
            description: description
          }
        }));
      }

      getIdea(id) {
        IdeaDataService.get(id)
          .then(response => {
            this.setState({
              currentIdea: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      updateIdea() {
        IdeaDataService.update(
          this.state.currentIdea.id,
          this.state.currentIdea
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
    
      deleteIdea() {    
        IdeaDataService.delete(this.state.currentIdea.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push('/ideas')
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { ideas } = this.state;

        return (
        <AuthConsumer>
            {({user}) => (
            <div>
                <h4>Ideas List</h4>
                <Link to={"/add"}><button className="badge badge-success"> + Submit new Idea </button></Link>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {ideas.map((idea, index) => (
                    <tr key={idea.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{idea.title}</td>
                    <td>
                        <Can
                        role={user.role}
                        perform="ideas:edit"
                        data={{
                            userId: user.id,
                            ideaOwnerId: idea.user
                        }}
                        yes={() => (
                            <button className="btn btn-sm btn-default">
                            Edit Idea
                            </button>
                        )}
                        />
                        <Can
                        role={user.role}
                        perform="ideas:delete"
                        yes={() => (
                            <button className="btn btn-sm btn-danger" onClick={this.deleteIdea}>
                            Delete Idea
                            </button>
                        )}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            )}
        </AuthConsumer>
        )};}

export default IdeasList;