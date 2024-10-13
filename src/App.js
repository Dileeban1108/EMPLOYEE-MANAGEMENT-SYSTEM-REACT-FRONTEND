import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ListUserComponents from './components/ListUserComponents';
import UpdateUserComponent from './components/UpdateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import CreateUserComponent from './components/CreateUserComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <div className="container">
            <Switch>
              <Route path="/" exact component={ListUserComponents} />
              <Route path="/users" exact component={ListUserComponents} />
              <Route path="/add-user" component={CreateUserComponent} />
              <Route path="/update-user/:id" component={UpdateUserComponent} />
              <Route path="/view-user/:id" component={ViewUserComponent} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
