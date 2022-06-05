import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/UI/Navbar/Navbar';
import './styles/App.css';
import AppRouter from './components/AppRouter';

function App() {

  return (
    <Router>
      <Navbar/>
      <AppRouter/>
    </Router>
  );
}

// function About() {
//   return <h2>About 123</h2>;
// }

export default App;

//05.06.22
// timecode: 2:29:42