import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from './pages/home';
import DashboardPage from './pages/dashboard';
import CallbackPage from "./pages/callback";
import ProfilePage from './pages/profile';
import ContactPage from './pages/contact';
import Auth from "./components/Auth";
import Idea from "./components/Idea";
import AddIdea from "./components/AddIdea";
import IdeaList from "./components/IdeaList";
import Login from "./Login/Login";
import Register from "./Register/Register";
import UpdateProfile from './components/UpdateProfile';
import AddProfile from './components/AddProfile';
import UserProfile from './components/UserProfile';
import CreateEvent from './components/CreateEvent';
import Vote from './components/VoteIdea';

function App() {
  return (
    <div className="App container">
      <Auth>
      <div className="jumbotron">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/dashboard" component={DashboardPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/userprofile" component={UserProfile}/>
            <Route path="/callback" component={CallbackPage}/>
            <Route exact path="/updateprofile" component={UpdateProfile} />
            <Route exact path="/addprofile" component={AddProfile} />
            <Route exact path="/createevent" component={CreateEvent} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/add" component={AddIdea} />
            <Route path="/ideas/:id" component={Idea} />
            <Route path="/ideas/vote/:id" component={Vote} />
            <Route exact path="/ideas" component={IdeaList} />
          </Switch>
        </Router>
      </div>
      </Auth>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);
