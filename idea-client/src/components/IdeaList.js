import React, { Component } from "react";
import IdeaDataService from "../services/idea.service";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";

export default class IdeasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveIdeas = this.retrieveIdeas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIdea = this.setActiveIdea.bind(this);
    this.removeAllIdeas = this.removeAllIdeas.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentIdea: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveIdeas();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
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

  refreshList() {
    this.retrieveIdeas();
    this.setState({
      currentIdea: null,
      currentIndex: -1
    });
  }

  setActiveIdea(idea, index) {
    this.setState({
      currentIdea: idea,
      currentIndex: index
    });
  }

  removeAllIdeas() {
    IdeaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    IdeaDataService.findByTitle(this.state.searchTitle)
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

  addVote() {
    IdeaDataService.addVote(
      this.state.currentIdea.id
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The idea was voted successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  minusVote() {
    IdeaDataService.minusVote(
      this.state.currentIdea.id
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The idea was unvoted successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, ideas, currentIdea, currentIndex } = this.state;
   
    return (
      <React.Fragment><NavBar /> <br></br>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Ideas List</h4>
          <Link to={"/add"}><button className="badge badge-success"> + Submit new Idea </button></Link>

          <ul className="list-group">
            {ideas &&
              ideas.map((idea, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIdea(idea, index)}
                  key={index}
                >
                  {idea.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentIdea ? (
            <div>
              <h4>Idea</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentIdea.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentIdea.description}
              </div>
              <div>
                <label>
                  <strong>Creator:</strong>
                </label>{" "}
                {currentIdea.user}
              </div>

            <button className="badge badge-success" onClick={this.addVote}> Upvote </button>
            <button className="badge badge-danger" onClick={this.minusVote}> Downvote </button>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Idea...</p>
            </div>
          )}
        </div>
      </div></React.Fragment>
    );
  }
}