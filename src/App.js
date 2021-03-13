import React from "react";
import "./App.css";
import MediaCard from "./Cards";
import Cart from "./Cart";
import history from "./history";
import { Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/">
          <MediaCard />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Router>
    </div>
  );
}

export default App;
