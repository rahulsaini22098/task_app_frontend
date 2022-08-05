import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Task from './components/Task'

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Task />
    </React.Fragment>
  );
}

export default App;
