import React from 'react';
import { Counter } from './components/counter/Counter';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TypeSelector } from './components/type-selector/TypeSelector';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <span>Pokemon</span>
        </header>
      </div>

      <Switch>
        <Route path="/kacsa">
          <Kacsa />
        </Route>
        <Route path="/">
          <TypeSelector />
        </Route>
      </Switch>
    </ BrowserRouter>
  );
}

function Kacsa() {
  return (<span>kacsa</span>);
}

export default App;
