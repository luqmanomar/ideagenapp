import React, { Component } from "react";
import IdeaDataService from "../services/idea.service";
import { NavBar } from "./NavBar";

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    //this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getIdea = this.getIdea.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);

    this.state = {
      currentIdea: {
        id: null,
        title: "",
        //description: "",
        creator: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getIdea(this.props.match.params.id);
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

  // onChangeDescription(e) {
  //   const description = e.target.value;
    
  //   this.setState(prevState => ({
  //     currentIdea: {
  //       ...prevState.currentIdea,
  //       description: description
  //     }
  //   }));
  // }

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
    const { currentIdea } = this.state;

    return (
      <React.Fragment>
        <NavBar /><br></br>
      <div>
        {currentIdea ? (
          <div className="edit-form">
            <h4>Edit Idea</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentIdea.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentIdea.description}
                  onChange={this.onChangeDescription}
                />
              </div> */}

              </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteIdea}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateIdea}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Idea...</p>
          </div>
        )}
      </div></React.Fragment>
    );
  }
}