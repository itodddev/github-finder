import React from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar title="Github Finder" icon="fab fa-github" /> */}
        {/* Using defaultProps on Navbar component, so you dont have to pass props
            if you do send props they will overwrite the defaultProps */}
        <Navbar />
      </div>
    );
  }
}

export default App;
