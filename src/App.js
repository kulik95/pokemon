import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PokemonSelector } from "./components/pokemon-selector/PokemonSelector";
import { PokemonDetails } from './components/pokemon-details/PokemonDetails';
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img className="pokemonLogo" src="pokemon.png" />
        </header>
      </div>

      <Switch>
        <Route path="/details">
          <PokemonDetails />
        </Route>
        <Route path="/">
          <PokemonSelector />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
