import React, { Component } from "react";
import IdeaDataService from "../services/idea.service";
import { Link } from "react-router-dom";

export default class IdeasListUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveIdeas = this.retrieveIdeas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIdea = this.setActiveIdea.bind(this);
    this.removeAllIdeas = this.removeAllIdeas.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      // tutorials: [],
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

  render() {
    const { searchTitle, ideas, currentIdea, currentIndex } = this.state;
   
    return (
      <React.Fragment> <br></br>
      <div>
      <h4>Your Ideas List</h4>
      <Link to={"/add"}><button className="badge badge-success"> + Submit new Idea </button></Link>
      </div>
      <br></br>
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
              <button className="btn btn-outline-secondary" type="button" onClick={this.searchTitle}> Search </button>
            </div>            
          </div>
        </div>
        <div className="col-md-6">
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
              {/* <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div> */}

              <Link
                to={"/ideas/" + currentIdea.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
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