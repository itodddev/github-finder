import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const response = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
  //   );

  //   this.setState({ users: response.data, loading: false });
  // }

  searchUsers = async (searchField) => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchField}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );
    // search results are on the response.data.items
    this.setState({ users: response.data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );

    // search results are on the response.data.items
    this.setState({ user: response.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );

    // search results are on the response.data.items
    this.setState({ repos: response.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { users, user, repos, loading, alert } = this.state;
    return (
      <Router>
        <div className="App">
          {/* <Navbar title="Github Finder" icon="fab fa-github" /> */}
          {/* Using defaultProps on Navbar component, so you dont have to pass props
            if you do send props they will overwrite the defaultProps */}
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
