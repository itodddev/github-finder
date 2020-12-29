import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );

    this.setState({ users: response.data, loading: false });
  }

  searchUsers = async (searchField) => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchField}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );
    // search results are on the response.data.items
    this.setState({ users: response.data.items, loading: false });
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        {/* <Navbar title="Github Finder" icon="fab fa-github" /> */}
        {/* Using defaultProps on Navbar component, so you dont have to pass props
            if you do send props they will overwrite the defaultProps */}
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
