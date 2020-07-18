import React from "react";
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PizzaForm from './components/PizzaForm';
import './App.css';


function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Lambda Eats</h1>
        <p>Pizza in Minutes!</p>
        <Link to={'/pizza'}
          className='App-link'
        >
          ORDER
        </Link>
      </header>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/pizza'>
        <PizzaForm />
      </Route>
    </div>
  );
};

export default App;
