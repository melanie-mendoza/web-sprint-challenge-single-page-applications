import React from "react";
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PizzaForm from './components/PizzaForm';


function App() {
  return (
    <div className='App'>
      <header>
        <h1>Lambda Eats</h1>
        <p>Welcome! Great PIZZA is not one-size-fits-all. Let us know how you like your pizza and we'll make it for you, just the way you like it.</p>
        <Link to={'/pizza'}
          className='Pizza-link'
        >
          Yes, make me my customized pizza!
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
