import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/UI/Navbar/Navbar';
import './styles/App.css';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context/'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <Router>
        <Navbar/>
        <AppRouter/>
      </Router>
    </AuthContext.Provider>
  );
}

// function About() {
//   return <h2>About 123</h2>;
// }

export default App;

//06.06.22
// timecode: 2:47:08