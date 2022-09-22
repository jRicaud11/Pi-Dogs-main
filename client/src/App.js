import './App.css';
import React from 'react';
import Home from './Components/Home/Home.jsx'
import Detail from './Components/Detail/DogDetail.jsx'
import CreateDog from './Components/CreateDog/CreateDog.jsx'
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';

//Aca se ponen los componentes dentro de un fragment y se arman las rutas

function App() {
  
  return (
    <>
      <Route exact path={"/"} component={LandingPage} />
      <Route exact path={"/dogs/:id"} component={Detail} />
      <Route exact path={"/create"} component={CreateDog} />
      <Route exact path={"/home"} component={Home} />
    </>
  );
}

export default App;
