import React, { Component } from "react";

import TaskDataService from "../services/task.service";
import {AuthConsumer} from "../authContext";
import Can from "./Can";
import { Link } from "react-router-dom";

class EventsList extends Component {

    constructor(props) {
        super(props);
        this.retrieveEvents = this.retrieveEvents.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);   
    
        this.state = {
          events: [],
          currentEvent: null,
        //   currentIndex: -1,
        //   searchTitle: ""
        };
      }

      componentDidMount() {
        this.retrieveEvents();
      }

      retrieveEvents() {
        TaskDataService.getAll()
          .then(response => {
            this.setState({
              events: response.data
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
            currentEvent: {
              ...prevState.currentEvent,
              title: title
            }
          };
        });
      }

      onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
          currentEvent: {
            ...prevState.currentEvent,
            description: description
          }
        }));
      }

      getEvent(id) {
        TaskDataService.get(id)
          .then(response => {
            this.setState({
              currentEvent: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      updateEvent() {
        TaskDataService.update(
          this.state.currentEvent.id,
          this.state.currentEvent
        )
          .then(response => {
            console.log(response.data);
            this.setState({
              message: "The event was updated successfully!"
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      deleteEvent() {    
        TaskDataService.delete(this.state.currentEvent.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push('/events')
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { events } = this.state;

        return (
        <AuthConsumer>
            {({user}) => (
            <div>
                <h4>Events List</h4> <Link to={"/createevent"}><button className="badge badge-success"> + Create new event </button></Link>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {events.map((event, index) => (
                    <tr key={event.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                    <td>{event.status}</td>
                    <td>
                        <Can
                        role={user.role}
                        perform="ideas:edit"
                        data={{
                            userId: user.id,
                            eventOwnerId: event.user
                        }}
                        yes={() => (
                            <button className="btn btn-sm btn-default">
                            Edit Event
                            </button>
                        )}
                        />
                        <Can
                        role={user.role}
                        perform="events:delete"
                        yes={() => (
                            <button className="btn btn-sm btn-danger" onClick={this.deleteEvent}>
                            Delete Event
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

export default EventsList;